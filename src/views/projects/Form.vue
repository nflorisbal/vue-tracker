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
  </section>
</template>

<script lang="ts">
import { useStoreProject } from '@/store';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormView',
  props: {
    id: {
      type: String,
    },
  },
  mounted() {
    if (this.id) {
      const project = this.store.state.projects.find(
        (project) => project.id === this.id
      );

      this.projectName = project?.name || '';
    }
  },
  data() {
    return {
      projectName: '',
    };
  },
  methods: {
    save(): void {
      if (this.id) {
        this.store.commit('UPDATE_PROJECT', {
          id: this.id,
          name: this.projectName,
        });
        this.$router.push('/projects');
      } else {
        this.store.commit('ADD_PROJECT', this.projectName);
        this.projectName = '';
        this.$router.push('/projects');
      }
    },
  },
  setup() {
    const store = useStoreProject();
    return {
      store,
    };
  },
});
</script>

<style scoped>
.projects {
  padding: 1.25rem;
}
</style>
