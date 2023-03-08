<template>
  <TaskForm @onSaveTask="addTask" />
  <div class="task-list">
    <TaskItem v-for="(task, index) in tasks" :key="index" :task="task" />
    <TaskBox v-if="emptyTasks">No tasks</TaskBox>
  </div>
</template>

<script lang="ts">
import ITask from '@/interfaces/ITask';
import { useStoreProject } from '@/store';
import { GET_TASKS, REGISTER_TASK, GET_PROJECTS } from '@/store/actions-type';
import { computed, defineComponent } from 'vue';
import TaskBox from '../components/TaskBox.vue';
import TaskForm from '../components/TaskForm.vue';
import TaskItem from '../components/TaskItem.vue';

export default defineComponent({
  name: 'TasksView',
  components: { TaskForm, TaskItem, TaskBox },
  computed: {
    emptyTasks(): boolean {
      return this.tasks.length === 0;
    },
  },
  methods: {
    addTask(task: ITask): void {
      this.store.dispatch(REGISTER_TASK, task);
    },
  },
  setup() {
    const store = useStoreProject();
    store.dispatch(GET_TASKS);
    store.dispatch(GET_PROJECTS);
    return {
      tasks: computed(() => store.state.tasks),
      store,
    };
  },
});
</script>
