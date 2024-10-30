import { prependZeroToString } from "./strings";

export const getCurrentLocalISOString = (): string => {
  const now = new Date();
  const year = prependZeroToString(now.getFullYear().toString(), 4);
  const month = prependZeroToString((now.getMonth() + 1).toString(), 2);
  const day = prependZeroToString(now.getDate().toString(), 2);
  const hour = prependZeroToString(now.getHours().toString(), 2);
  const minute = prependZeroToString(now.getMinutes().toString(), 2);
  const second = prependZeroToString(now.getSeconds().toString(), 2);
  const milliseconds = prependZeroToString(now.getMilliseconds().toString(), 3);
  return `${year}-${month}-${day}T${hour}:${minute}:${second}.${milliseconds}Z`;
};

export const getShortDayString = (day: Date): string => {
  return day
    .toLocaleDateString("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(/,/g, "");
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
