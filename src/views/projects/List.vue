<template>
  <section>
    <router-link to="/projects/new" class="button">
      <span class="icon is-small">
        <span class="fas fa-plus"></span>
      </span>
      <span>New project</span>
    </router-link>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.name }}</td>
          <td>
            <router-link :to="`/projects/${project.id}`" class="button">
              <span class="icon is-small">
                <span class="fas fa-pencil-alt"></span>
              </span>
            </router-link>
            <button class="button ml-2 is-danger" @click="exclude(project.id)">
              <span class="icon is-small">
                <span class="fas fa-trash"></span>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { useStoreProject } from '@/store';
import { GET_PROJECTS } from '@/store/actions-type';
import { EXCLUDE_PROJECT } from '@/store/mutations-type';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'ListProjectsView',
  methods: {
    exclude(id: string) {
      this.store.commit(EXCLUDE_PROJECT, id);
    },
  },
  setup() {
    const store = useStoreProject();
    store.dispatch(GET_PROJECTS);
    return {
      projects: computed(() => store.state.projects),
      store,
    };
  },
});
</script>
