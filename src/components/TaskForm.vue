<template>
  <div class="box">
    <div class="columns">
      <div class="column is-8" role="form" aria-label="Form to create new task">
        <input
          type="text"
          class="input"
          placeholder="Tasks to start"
          v-model="taskDescription"
        />
      </div>
      <div class="column">
        <TimerControl @stop="endTask" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TimerControl from './TimerControl.vue';

export default defineComponent({
  name: 'TaskForm',
  components: {
    TimerControl,
  },
  data() {
    return {
      taskDescription: '',
    };
  },
  methods: {
    endTask(elapsedTime: number): void {
      this.taskDescription = '';
    },
  },
});
</script>
