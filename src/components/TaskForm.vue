<template>
  <div class="box">
    <div class="columns">
      <div class="column is-8" role="form" aria-label="Form to create new task">
        <input type="text" class="input" placeholder="Taks to start" />
      </div>
      <div class="column">
        <div
          class="is-flex is-align-items-center is-justify-content-space-between"
        >
          <section>
            <strong>{{ elapsedTime }}</strong>
          </section>
          <button class="button" @click="startTask">
            <span class="icon"><i class="fas fa-play"></i></span>
            <span>play</span>
          </button>
          <button class="button" @click="stopTask">
            <span class="icon"><i class="fas fa-stop"></i></span>
            <span>stop</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TaskForm',
  data() {
    return {
      timeInSeconds: 0,
      timerId: 0,
    };
  },
  computed: {
    elapsedTime(): string {
      return new Date(this.timeInSeconds * 1000)
        .toISOString()
        .substring(11, 19);
    },
  },
  methods: {
    startTask(): void {
      this.timerId = setInterval(() => {
        this.timeInSeconds++;
      }, 1000);
    },
    stopTask(): void {
      clearInterval(this.timerId);
    },
  },
});
</script>
