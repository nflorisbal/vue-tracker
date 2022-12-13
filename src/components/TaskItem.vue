<template>
  <TaskBox>
    <div class="columns">
      <div class="column is-7">
        {{ task.description || 'Tarefa sem descrição' }}
      </div>
      <div class="column">
        <DisplayStopwatch :timeInSeconds="task.timeInSeconds" />
      </div>
    </div>
  </TaskBox>
</template>

<script lang="ts">
import ITask from '@/interfaces/ITask';
import { defineComponent, PropType } from 'vue';
import DisplayStopwatch from './DisplayStopwatch.vue';
import TaskBox from './TaskBox.vue';

export default defineComponent({
  name: 'TaskItem',
  components: {
    DisplayStopwatch,
    TaskBox,
  },
  props: {
    task: {
      type: Object as PropType<ITask>,
      required: true,
    },
  },
});
</script>
