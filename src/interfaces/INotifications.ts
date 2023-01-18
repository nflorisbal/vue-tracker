export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
}

export interface INotifications {
  title: string;
  message: string;
  type: NotificationType;
  id: number;
}