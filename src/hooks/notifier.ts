import { NotificationType } from '@/interfaces/INotifications';
import { store } from '@/store';
import { NOTIFY } from '@/store/mutations-type';

type Notifier = {
  notify: (type: NotificationType, title: string, message: string) => void;
};

export default (): Notifier => {
  const notify = (
    type: NotificationType,
    title: string,
    message: string
  ): void => {
    store.commit(NOTIFY, {
      type: type,
      title: title,
      message: message,
    });
  };

  return {
    notify,
  };
};
