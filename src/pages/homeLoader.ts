import { FAKE_CARDS } from "../shared/constants/fakeCardData";
import { FAKE_NOTIFICATIONS } from "../shared/constants/fakeNotifications";

const loader = async () => {
  return { FAKE_CARDS, FAKE_NOTIFICATIONS };
};

export default loader;
