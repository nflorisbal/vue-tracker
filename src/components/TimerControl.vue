<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <DisplayStopwatch :timeInSeconds="timeInSeconds" />
    <button class="button" @click="startTask" :disabled="timerRunning">
      <span class="icon"><span class="fas fa-play"></span></span>
      <span>play</span>
    </button>
    <button class="button" @click="stopTask" :disabled="!timerRunning">
      <span class="icon"><span class="fas fa-stop"></span></span>
      <span>stop</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DisplayStopwatch from './DisplayStopwatch.vue';

export default defineComponent({
  name: 'TimerControl',
  emits: ['start', 'stop'],
  components: {
    DisplayStopwatch,
  },
  data() {
    return {
      timeInSeconds: 0,
      timerId: 0,
      timerRunning: false,
    };
  },

  methods: {
    startTask(): void {
      this.timerRunning = true;
      this.timerId = setInterval(() => {
        this.timeInSeconds++;
      }, 1000);
    },
    stopTask(): void {
      this.timerRunning = false;
      clearInterval(this.timerId);
      this.$emit('stop', this.timeInSeconds);
      this.timeInSeconds = 0;
    },
  },
});
</script>
