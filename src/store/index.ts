import { INotifications } from '@/interfaces/INotifications';
import IProject from '@/interfaces/IProject';
import { InjectionKey } from 'vue';
import { createStore, Store, useStore } from 'vuex';
import {
  CHANGE_PROJECT,
  DELETE_PROJECT,
  GET_PROJECTS,
  REGISTER_PROJECT,
} from './actions-type';
import {
  ADD_PROJECT,
  EXCLUDE_PROJECT,
  NOTIFY,
  SET_PROJECTS,
  UPDATE_PROJECT,
} from './mutations-type';
import http from '@/http';

interface State {
  projects: IProject[];
  notifications: INotifications[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projects: [],
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
  },
});

export function useStoreProject(): Store<State> {
  return useStore(key);
}
