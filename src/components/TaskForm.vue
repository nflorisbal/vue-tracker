<template>
  <div class="box form">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Form to create new task">
        <input
          type="text"
          class="input"
          placeholder="Tasks to start"
          v-model="taskDescription"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProject">
            <option value="">Select a project</option>
            <option
              v-for="project in projects"
              :key="project.id"
              :value="project.id"
            >
              {{ project.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <TimerControl @stop="endTask" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { NotificationType } from '@/interfaces/INotifications';
import { useStoreProject } from '@/store';
import { NOTIFY } from '@/store/mutations-type';
import { computed, defineComponent } from 'vue';
import TimerControl from './TimerControl.vue';

export default defineComponent({
  name: 'TaskForm',
  emits: ['onSaveTask'],
  components: {
    TimerControl,
  },
  data() {
    return {
      taskDescription: '',
      idProject: '',
    };
  },
  methods: {
    endTask(elapsedTime: number): void {
      const project = this.projects.find(
        (project) => project.id === this.idProject
      );

      if (!project) {
        this.store.commit(NOTIFY, {
          type: NotificationType.ERROR,
          title: 'Error',
          message: 'You must select a project',
        });
        return;
      }

      this.$emit('onSaveTask', {
        description: this.taskDescription,
        timeInSeconds: elapsedTime,
        project: project,
      });
      this.taskDescription = '';
    },
  },
  setup() {
    const store = useStoreProject();
    return {
      projects: computed(() => store.state.projects),
      store,
    };
  },
});
</script>

<style>
.form {
  color: var(--text-primary);
  background-color: var(--bg-primary);
}
</style>
