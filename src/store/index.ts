import { INotifications } from '@/interfaces/INotifications';
import IProject from '@/interfaces/IProject';
import { InjectionKey } from 'vue';
import { createStore, Store, useStore } from 'vuex';
import {
  ADD_PROJECT,
  EXCLUDE_PROJECT,
  NOTIFY,
  UPDATE_PROJECT,
} from './mutations-type';

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
});

export function useStoreProject(): Store<State> {
  return useStore(key);
}
