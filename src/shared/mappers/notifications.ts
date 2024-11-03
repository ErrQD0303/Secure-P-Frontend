import { INotification, INotificationFromDB } from "../../types/notification";

export const toINotification = (
  notification: INotificationFromDB
): INotification => {
  return {
    ...notification,
    timestamp: new Date(notification.timestamp),
  };
};
