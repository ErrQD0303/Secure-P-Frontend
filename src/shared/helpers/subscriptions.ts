import { ISubscription } from "../../types/subscription";

export const isISubscription = (data: unknown): data is ISubscription => {
  return (data as ISubscription) !== undefined;
};
