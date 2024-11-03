import { getNotifications } from "./features/notifications/indexesDB";

const loader = async () => {
  const notifications = await getNotifications();
  return { notifications };
};

export default loader;
