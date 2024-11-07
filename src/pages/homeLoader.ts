import { FAKE_NOTIFICATIONS } from "../shared/constants/fakeNotifications";

const loader = async () => {
  return {
    notifications: FAKE_NOTIFICATIONS,
  };
};

export default loader;
