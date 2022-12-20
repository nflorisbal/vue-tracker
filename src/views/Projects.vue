<template>
  <section class="projects">
    <h1>Projetcs</h1>
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
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { useStoreProject } from '@/store';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'ProjectsView',
  setup() {
    const store = useStoreProject();
    return {
      projects: computed(() => store.state.projects),
    };
  },
});
</script>

<style scoped>
.projects {
  padding: 1.25rem;
}
</style>
