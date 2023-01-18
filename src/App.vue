<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'dark-mode': activeDarkMode }"
  >
    <div class="column is-one-quarter">
      <SideBar @onChangeTheme="changeTheme" />
    </div>
    <div class="column is-three-quarter content">
      <Notifications />
      <router-view />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Notifications from './components/Notifications.vue';
import SideBar from './components/SideBar.vue';

export default defineComponent({
  name: 'App',
  components: { SideBar, Notifications },
  data() {
    return {
      activeDarkMode: false,
    };
  },
  methods: {
    changeTheme(activeDarkMode: boolean): void {
      this.activeDarkMode = activeDarkMode;
    },
  },
});
</script>

<style>
.task-list {
  padding: 1.25rem;
}

main {
  --bg-primary: #fff;
  --text-primary: #000;
}

main.dark-mode {
  --bg-primary: #2b2d42;
  --text-primary: #ddd;
}

.content {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}
</style>
