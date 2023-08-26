import notifyService from "../Services/NotifyService";
import { useNavigate } from "react-router-dom";
import { authStore } from "../Redux/AuthState";
import { useEffect } from "react";

function useVerifyUserLoggedIn() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authStore.getState().user) {
      notifyService.error("You are not Logged in!!!");

      //send user to login page
      navigate("/clothing-products/login");
    }
  }, []);
}

export default useVerifyUserLoggedIn;
