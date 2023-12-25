import {INotificationItem} from '../store/app/appReducer';

export const unreadedNotificationsFunc = (
  notifications: INotificationItem[],
) => {
  return notifications.filter(n => n.isRead === false);
};
