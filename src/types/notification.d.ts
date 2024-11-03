// ../types/notification.d.ts
export interface INotification {
  id?: number; // Optional because IndexedDB can auto-generate this
  title: string;
  message: string;
  timestamp: Date; // Use a date string or ISO string for simplicity
  isRead: boolean;
}

export interface INotificationFromDB {
  id?: number; // Optional because IndexedDB can auto-generate this
  title: string;
  message: string;
  timestamp: string; // Use a date string or ISO string for simplicity
  isRead: boolean;
}
