import React from "react";
import { logOut } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { clearUser } from "../store/userSlice";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    const signOut = async () => {
      if (await logOut()) {
        navigate("/login");
        dispatch(clearUser());
      }

      navigate("/");
    };

    signOut();
  }, [navigate, dispatch]);
  return <></>;
}

export default Logout;
