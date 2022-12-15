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
import { defineComponent } from 'vue';
import IProject from '../interfaces/IProject';

export default defineComponent({
  name: 'ProjectsView',
  data() {
    return {
      projectName: '',
      projects: [] as IProject[],
    };
  },
  methods: {
    save(): void {
      const project: IProject = {
        name: this.projectName,
        id: new Date().toISOString(),
      };
      this.projects.push(project);
      this.projectName = '';
    },
  },
});
</script>

<style scoped>
.projects {
  padding: 1.25rem;
}
</style>
