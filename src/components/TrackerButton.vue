<template>
  <button type="button" class="button" @click="clicked" :disabled="disableStatus">
    <span class="icon"><span :class="iconClass"></span></span>
    <span>{{ buttonText }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TrackerButton',
  props: {
    disableStatus: {
      type: Boolean,
      default: false,
    },
    buttonText: {
      type: String,
      required: true,
    },
    iconClass: {
      type: String,
      required: true,
    },
  },
  methods: {
    clicked(): void {
      this.$emit('clicked');
    },
  },
});
</script>
