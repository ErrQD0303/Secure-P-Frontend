import { LoaderFunctionArgs } from "react-router-dom";
import { getSubscription } from "../services/subscriptionService";

const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params as {
    id: string;
  };
  const data = await getSubscription(id);
  return { subscriptionDetail: data };
};

export default loader;
