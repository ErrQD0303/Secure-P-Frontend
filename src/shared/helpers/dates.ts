import { prependZeroToString } from "./strings";

export const getCurrentLocalISOString = (now: Date = new Date()): string => {
  const year = prependZeroToString(now.getFullYear().toString(), 4);
  const month = prependZeroToString((now.getMonth() + 1).toString(), 2);
  const day = prependZeroToString(now.getDate().toString(), 2);
  const hour = prependZeroToString(now.getHours().toString(), 2);
  const minute = prependZeroToString(now.getMinutes().toString(), 2);
  const second = prependZeroToString(now.getSeconds().toString(), 2);
  const milliseconds = prependZeroToString(now.getMilliseconds().toString(), 3);
  return `${year}-${month}-${day}T${hour}:${minute}:${second}.${milliseconds}Z`;
};

export const getShortDayString = (
  day: Date,
  hasWeekDay: boolean = true
): string => {
  return !hasWeekDay
    ? day.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : day
        .toLocaleDateString("en-US", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .replace(/,/g, "");
};

export const getCasualRevenueCardDateString = (date: Date): string => {
  const year = prependZeroToString(date.getFullYear().toString(), 4);
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = prependZeroToString(date.getDate().toString(), 2);
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  const now = new Date();
  return prependZeroToString(now.getFullYear().toString(), 4) === year
    ? `${weekday} ${day} ${month}`
    : `${weekday} ${day} ${month} ${year.slice(-2)}`;
};

export const getDailyParkingCardDateString = (date: Date): string => {
  const year = prependZeroToString(date.getFullYear().toString(), 4);
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = date.getDate().toString();
  return `${day} ${month} ${year}`;
};

export const getNotificationDateString = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);
  return `${day}/${month}/${year}`;
};

export const formatTimeLeft = (time: number): string => {
  const day = Math.floor(time / 86400);
  const hour = (time % 86400) / 3600;
  const minute = (time % 3600) / 60;
  return `${
    day > 0
      ? `${day}${day > 1 ? " days" : " day"}`
      : Math.floor(hour) > 0
      ? `${Math.trunc(hour)}${hour > 1 ? " hours" : " hour"}`
      : `${Math.trunc(minute)}${minute > 1 ? " minutes" : " minute"}`
  }`;
};

export const formatNotificationTime = (
  date: Date,
  currentTime: Date
): string => {
  const remainingTime = Math.abs(date.getTime() - currentTime.getTime()) / 1000;
  const day = Math.floor(remainingTime / 86400);
  if (day === 1) return "Yesterday";
  if (day > 3) return getNotificationDateString(date);
  return `${formatTimeLeft(remainingTime)}`;
};

export const format12HourTime = (date: Date): string => {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";
  return `${hour % 12 || 12}:${minute.toString().padStart(2, "0")} ${ampm}`;
};
