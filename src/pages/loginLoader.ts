import store from "../store/store";
import { getUserInfoFromDB } from "../services/userService";
import { setUser } from "../store/userSlice";
import { redirect } from "react-router-dom";

const loader = async () => {
  const currentUser = await getUserInfoFromDB();

  if (currentUser) {
    store.dispatch(setUser(currentUser));
    return redirect("/");
  }

  return null;
};

export default loader;
