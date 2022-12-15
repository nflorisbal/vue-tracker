<template>
  <TaskForm @onSaveTask="addTask" />
  <div class="task-list">
    <TaskItem v-for="(task, index) in tasks" :key="index" :task="task" />
    <TaskBox v-if="emptyTasks">No tasks</TaskBox>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskForm from '../components/TaskForm.vue';
import TaskItem from '../components/TaskItem.vue';
import TaskBox from '../components/TaskBox.vue';
import ITask from '../interfaces/ITask';

export default defineComponent({
  name: 'TasksView',
  components: { TaskForm, TaskItem, TaskBox },
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
