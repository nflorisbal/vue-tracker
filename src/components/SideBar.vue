<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="" />
    </h1>
    <button class="button" @click="changeTheme">Dark Mode</button>
    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link to="/" class="link"
            ><span class="fas fa-tasks"></span> Tasks</router-link
          >
        </li>
        <li>
          <router-link to="/projects" class="link"
            ><span class="fas fa-project-diagram"></span> Projects</router-link
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SideBar',
  emits: ['onChangeTheme'],
  data() {
    return {
      darkMode: false,
    };
  },
  methods: {
    changeTheme(): void {
      this.darkMode = !this.darkMode;
      this.$emit('onChangeTheme', this.darkMode);
    },
  },
});
</script>

<style scoped>
header {
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  padding: 1rem;
  text-align: center;
}
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}

.panel li {
  margin: 8px 0;
}

.link {
  color: #fff;
}

.link:hover {
  color: #faf0ca;
}

.link.router-link-active {
  color: #faf0ca;
}
</style>
