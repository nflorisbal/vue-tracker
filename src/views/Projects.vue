<template>
  <section class="projects">
    <h1>Projetcs</h1>
    <form @submit.prevent="save">
      <div class="field">
        <label class="label" for="projectName">Project name</label>
        <input
          class="input"
          type="text"
          placeholder="Project name"
          id="projectName"
          v-model="projectName"
        />
      </div>
      <div class="field" type="submit">
        <button class="button">Save</button>
      </div>
    </form>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.name }}</td>
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
  data() {
    return {
      projectName: '',
    };
  },
  methods: {
    save(): void {
      this.store.commit('ADD_PROJECT', this.projectName);
    },
  },
  setup() {
    const store = useStoreProject();
    return {
      store,
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
