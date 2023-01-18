<template>
  <div class="notifications">
    <article
      class="message"
      :class="context[notification.type]"
      v-for="notification in notifications"
      :key="notification.id"
    >
      <div class="message-header">{{ notification.title }}</div>
      <div class="message-body">{{ notification.message }}</div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStoreProject } from '@/store';
import { NotificationType } from '@/interfaces/INotifications';

export default defineComponent({
  name: 'NotificationsCard',
  data() {
    return {
      context: {
        [NotificationType.SUCCESS]: 'is-success',
        [NotificationType.ERROR]: 'is-danger',
        [NotificationType.WARNING]: 'is-warning',
      },
    };
  },
  setup() {
    const store = useStoreProject();

    return {
      notifications: computed(() => store.state.notifications),
    };
  },
});
</script>

<style scoped>
.notifications {
  position: absolute;
  right: 0;
  width: 300px;
  padding: 8px;
  z-index: 999;
}
</style>
