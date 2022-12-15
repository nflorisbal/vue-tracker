<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <DisplayStopwatch :timeInSeconds="timeInSeconds" />
    <div class="buttons">
      <TrackerButton
        buttonText="play"
        iconClass="fas fa-play"
        :disableStatus="timerRunning"
        @click="startTask"
      />
      <TrackerButton
        buttonText="stop"
        iconClass="fas fa-stop"
        :disableStatus="!timerRunning"
        @click="stopTask"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DisplayStopwatch from './DisplayStopwatch.vue';
import TrackerButton from './TrackerButton.vue';

export default defineComponent({
  name: 'TimerControl',
  emits: ['start', 'stop'],
  components: {
    DisplayStopwatch,
    TrackerButton,
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

<style>
.buttons > TrackerButton {
  margin-left: 0.5rem;
}
</style>
