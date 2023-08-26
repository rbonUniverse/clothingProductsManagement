import notifyService from "../Services/NotifyService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { authStore } from "../Redux/AuthState";

function useVerifyAdmin() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authStore.getState().token) {
      notifyService.error("You are not Admin!!!");

      //send user to login page
      navigate("/clothing-products/login");
    }
  }, []);
}

export default useVerifyAdmin;
