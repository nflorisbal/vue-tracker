import { NotificationType } from '@/interfaces/INotifications';
import { NOTIFY } from '@/store/mutations-type';
import { store } from '@/store';

export const notifyMixin = {
  methods: {
    notify(type: NotificationType, title: string, message: string): void {
      store.commit(NOTIFY, {
        type: type,
        title: title,
        message: message,
      });
    },
  },
};
