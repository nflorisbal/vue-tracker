<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <SideBar />
    </div>
    <div class="column is-three-quarter">
      <TaskForm @onSaveTask="addTask" />
      <div class="task-list">
        <TaskItem v-for="(task, index) in tasks" :key="index" :task="task" />
        <TaskBox v-if="emptyTasks">No tasks</TaskBox>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from './components/SideBar.vue';
import TaskForm from './components/TaskForm.vue';
import TaskItem from './components/TaskItem.vue';
import TaskBox from './components/TaskBox.vue';
import ITask from './interfaces/ITask';

export default defineComponent({
  name: 'App',
  components: { SideBar, TaskForm, TaskItem, TaskBox },
  data() {
    return {
      tasks: [] as ITask[],
    };
  },
  computed: {
    emptyTasks(): boolean {
      return this.tasks.length === 0;
    },
  },
  methods: {
    addTask(task: ITask): void {
      this.tasks.push(task);
    },
  },
});
</script>

<style>
.task-list {
  padding: 1.25rem;
}
</style>
