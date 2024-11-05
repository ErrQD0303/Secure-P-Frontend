import { FAKE_NOTIFICATIONS } from "../../shared/constants/fakeNotifications";
import { getCurrentLocalISOString } from "../../shared/helpers/dates";
import { toINotification } from "../../shared/mappers/notifications";
import { INotification, INotificationFromDB } from "../../types/notification";

const INDEXES_DB_NAME: string = "Secure-P";
const INDEXES_DB_VERSION: number = 1;
const INDEXES_DB_NOTIFICATIONS_TABLE_NAME: string = "notifications";
const INDEXES_DB_RECORD_OPTIONS: IDBTransactionMode = "readwrite";

const isDev = import.meta.env.MODE === "development";

const setDatabaseInitialData = async (): Promise<void> => {
  addNotification(FAKE_NOTIFICATIONS);
};

export const createOrOpenNotificationDB = () => {
  const request = indexedDB.open(INDEXES_DB_NAME, INDEXES_DB_VERSION);

  request.onupgradeneeded = (event) => {
    const db = (event.target as IDBOpenDBRequest).result;

    // Create a notifications store if it doesn't exist
    if (!db.objectStoreNames.contains(INDEXES_DB_NOTIFICATIONS_TABLE_NAME)) {
      db.createObjectStore(INDEXES_DB_NOTIFICATIONS_TABLE_NAME, {
        keyPath: "id",
        autoIncrement: true,
      });
      setDatabaseInitialData().then(() => {});
    }
  };

  request.onerror = (event) => {
    if (!isDev) return;
    console.error("Database error", (event.target as IDBOpenDBRequest).error);
  };

  return request;
};

export const addNotification = (
  notification: Omit<INotification, "id"> | INotification[]
) => {
  const request = createOrOpenNotificationDB();

  request.onsuccess = (event) => {
    const db = (event.target as IDBOpenDBRequest).result;
    const transaction = db.transaction(
      INDEXES_DB_NOTIFICATIONS_TABLE_NAME,
      INDEXES_DB_RECORD_OPTIONS
    );
    const objectStore = transaction.objectStore(
      INDEXES_DB_NOTIFICATIONS_TABLE_NAME
    );

    if (Array.isArray(notification)) {
      notification.forEach((noti) => {
        addNotificationToDatabase(noti, objectStore);
      });
    } else {
      addNotificationToDatabase(notification, objectStore);
    }
  };
};

const addNotificationToDatabase = (
  notification: Omit<INotification, "id"> | INotification,
  objectStore: IDBObjectStore
) => {
  const notificationWithTimestamp = {
    ...notification,
    timestamp: getCurrentLocalISOString(notification.timestamp),
    isRead: false, // Defaulting to unread
  };

  const addRequest = objectStore.add(notificationWithTimestamp);

  addRequest.onsuccess = () => {
    if (!isDev) return;
    console.log("Notification added to the database.");
  };

  addRequest.onerror = (event) => {
    if (!isDev) return;
    console.error(
      "Error adding notification:",
      (event.target as IDBRequest).error
    );
  };
};

export const getNotifications = (): Promise<INotification[]> => {
  return new Promise((resolve, reject) => {
    const request = createOrOpenNotificationDB();

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(
        INDEXES_DB_NOTIFICATIONS_TABLE_NAME,
        INDEXES_DB_RECORD_OPTIONS
      );
      const objectStore = transaction.objectStore(
        INDEXES_DB_NOTIFICATIONS_TABLE_NAME
      );

      const getRequest = objectStore.getAll();

      getRequest.onsuccess = () => {
        const result = (getRequest.result as INotificationFromDB[]).map(
          (noti): INotification => toINotification(noti)
        );
        resolve(result);
      };

      getRequest.onerror = () => {
        reject(getRequest.error);
      };
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const markNotificationAsRead = async (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = createOrOpenNotificationDB();

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(
        INDEXES_DB_NOTIFICATIONS_TABLE_NAME,
        INDEXES_DB_RECORD_OPTIONS
      );
      const objectStore = transaction.objectStore(
        INDEXES_DB_NOTIFICATIONS_TABLE_NAME
      );

      const getRequest = objectStore.get(id);

      getRequest.onsuccess = () => {
        const notification = getRequest.result as INotification;
        if (!notification) reject(new Error("Notification not found."));
        notification.isRead = true;

        const putRequest = objectStore.put(notification);

        putRequest.onsuccess = () => {
          if (!isDev) return;
          console.log("Notification marked as read.");
          resolve();
        };
        putRequest.onerror = () => {
          reject(putRequest.error);
        };
      };

      getRequest.onerror = (event) =>
        reject((event.target as IDBRequest).error);
    };
    request.onerror = (event) =>
      reject((event.target as IDBOpenDBRequest).error);
  });
};

export const deleteNotification = async (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = createOrOpenNotificationDB();

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(
        INDEXES_DB_NOTIFICATIONS_TABLE_NAME,
        INDEXES_DB_RECORD_OPTIONS
      );
      const objectStore = transaction.objectStore(
        INDEXES_DB_NOTIFICATIONS_TABLE_NAME
      );

      const deleteRequest = objectStore.delete(id);

      deleteRequest.onsuccess = () => {
        if (!isDev) return;
        console.log("Notification deleted.");
        resolve();
      };

      deleteRequest.onerror = (event) =>
        reject((event.target as IDBRequest).error);
    };

    request.onerror = (event) =>
      reject((event.target as IDBOpenDBRequest).error);
  });
};
