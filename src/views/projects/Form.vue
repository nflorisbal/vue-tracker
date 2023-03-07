<template>
  <section>
    <form @submit.prevent="save">
      <div class="field">
        <label class="label" for="projectName">Project name</label>
        <input class="input" type="text" placeholder="Project name" id="projectName" v-model="projectName" />
      </div>
      <div class="field" type="submit">
        <button class="button">Save</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import useNotifier from '@/hooks/notifier';
import { NotificationType } from '@/interfaces/INotifications';
import { useStoreProject } from '@/store';
import { CHANGE_PROJECT, REGISTER_PROJECT } from '@/store/actions-type';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormProjectsView',
  props: {
    id: {
      type: String,
    },
  },
  mounted() {
    if (this.id) {
      const project = this.store.state.projects.find(
        (project) => project.id === this.id
      );

      this.projectName = project?.name || '';
    }
  },
  data() {
    return {
      projectName: '',
    };
  },
  methods: {
    save(): void {
      if (this.id) {
        this.store.dispatch(CHANGE_PROJECT, {
          id: this.id,
          name: this.projectName,
        }).then(() => this.success());
      } else {
        this.store.dispatch(REGISTER_PROJECT, this.projectName).then(() =>
          this.success()
        )
      }
    },
    success(): void {
      this.projectName = '';
      this.notify(
        NotificationType.SUCCESS,
        'Project created',
        'The project was created successfully'
      );
      this.$router.push('/projects');
    }
  },
  setup() {
    const store = useStoreProject();
    const { notify } = useNotifier();
    return {
      store,
      notify,
    };
  },
});
</script>
