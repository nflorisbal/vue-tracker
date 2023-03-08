import http from '@/http';
import { INotifications } from '@/interfaces/INotifications';
import IProject from '@/interfaces/IProject';
import ITask from '@/interfaces/ITask';
import { InjectionKey } from 'vue';
import { createStore, Store, useStore } from 'vuex';
import {
  CHANGE_PROJECT,
  DELETE_PROJECT,
  GET_PROJECTS,
  GET_TASKS,
  REGISTER_PROJECT,
  REGISTER_TASK,
} from './actions-type';
import {
  ADD_PROJECT,
  ADD_TASK,
  EXCLUDE_PROJECT,
  NOTIFY,
  SET_PROJECTS,
  SET_TASKS,
  UPDATE_PROJECT,
} from './mutations-type';

interface State {
  projects: IProject[];
  tasks: ITask[];
  notifications: INotifications[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projects: [],
    tasks: [],
    notifications: [],
  },
  mutations: {
    [ADD_PROJECT](state, projectName: string) {
      const project = {
        id: new Date().toISOString(),
        name: projectName,
      } as IProject;
      state.projects.push(project);
    },
    [ADD_TASK](state, task: ITask) {
      state.tasks.push(task);
    },
    [UPDATE_PROJECT](state, project: IProject) {
      const projectIndex = state.projects.findIndex((p) => p.id === project.id);
      state.projects[projectIndex] = project;
    },
    [EXCLUDE_PROJECT](state, projectId: string) {
      state.projects = state.projects.filter((p) => p.id !== projectId);
    },
    [SET_PROJECTS](state, projects: IProject[]) {
      state.projects = projects;
    },
    [SET_TASKS](state, tasks: ITask[]) {
      state.tasks = tasks;
    },
    [NOTIFY](state, notification: INotifications) {
      notification.id = new Date().getTime();
      state.notifications.push(notification);
      setTimeout(() => {
        state.notifications = state.notifications.filter(
          (n) => n.id !== notification.id
        );
      }, 2000);
    },
  },
  actions: {
    [GET_PROJECTS]({ commit }) {
      http
        .get('projects')
        .then((response) => commit(SET_PROJECTS, response.data));
    },
    [REGISTER_PROJECT](context, projectName: string) {
      return http.post('/projects', { name: projectName });
    },
    [CHANGE_PROJECT](context, project: IProject) {
      return http.put(`/projects/${project.id}`, project);
    },
    [DELETE_PROJECT]({ commit }, projectId: string) {
      return http.delete(`/projects/${projectId}`).then(() => {
        commit(EXCLUDE_PROJECT, projectId);
      });
    },
    [GET_TASKS]({ commit }) {
      http.get('tasks').then((response) => commit(SET_TASKS, response.data));
    },
    [REGISTER_TASK]({ commit }, task: ITask) {
      return http
        .post('/tasks', task)
        .then((response) => commit(ADD_TASK, response.data));
    },
  },
});

export function useStoreProject(): Store<State> {
  return useStore(key);
}
