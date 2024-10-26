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
