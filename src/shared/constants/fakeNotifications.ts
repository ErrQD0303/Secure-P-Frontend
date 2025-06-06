import { INotification } from "../../types/notification";

export const FAKE_NOTIFICATIONS: INotification[] = [
  {
    id: 1,
    title: "New message",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum est voluptatum facilis ut alias impedit nulla hic eius non odio consequatur, odit unde voluptates autem aut nisi rem dolorem aspernatur.",
    timestamp: new Date(),
    isRead: false,
  },
  {
    id: 2,
    title: "New message",
    message: "New message received from John Doe.",
    timestamp: new Date(),
    isRead: false,
  },
  {
    id: 3,
    title: "New message",
    message: "Your password will expire in 3 days.",
    timestamp: new Date("2024-11-03T12:00:00Z"),
    isRead: false,
  },
  {
    id: 4,
    title: "New message",
    message: "Your password will expire in 3 days.",
    timestamp: new Date("2021-09-01T12:00:00Z"),
    isRead: false,
  },
];
