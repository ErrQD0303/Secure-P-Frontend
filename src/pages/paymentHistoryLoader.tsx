import { getAllSubscriptions } from "../services/subscriptionService";

const loader = async () => {
  const loaderData = await getAllSubscriptions({ userId: "US1", isPaid: true });
  return loaderData;
};

export default loader;
