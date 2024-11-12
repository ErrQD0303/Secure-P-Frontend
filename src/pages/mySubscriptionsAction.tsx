import { ActionFunctionArgs } from "react-router-dom";
import { getAllSubscriptions } from "../services/subscriptionService";

export default async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const formDataObject = Object.fromEntries(formData) as unknown as {
    pageOffset: number;
  };
  const newData = await getAllSubscriptions({
    userId: "US1",
    offset: +formDataObject.pageOffset + 1,
  });
  return newData;
}
