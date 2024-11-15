import { LoaderFunctionArgs, redirect } from "react-router-dom";

const action = async ({ request }: LoaderFunctionArgs) => {
  if (request.method === "POST") {
    console.log(request);
    return redirect("/subscriptions");
  }
};

export default action;
