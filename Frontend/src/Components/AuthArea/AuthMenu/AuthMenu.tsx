import { authStore } from "../../../Redux/AuthState";
import RoleModel from "../../../Models/RoleModel";
import UserModel from "../../../Models/UserModel";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {
  const [user, setUser] = useState<UserModel|null>(null);

  useEffect(() => {
    setUser(authStore.getState().user);

    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });

    // Return a function which will be called when component is about to be destroyed:
    return () => unsubscribe();
  }, []);

  const FaPlusStyling = {
    fontSize: "12px",
  };

  return (
    <div className="AuthMenu">
      <div className="userNav">
        {user?.role === RoleModel.User && (
          <>
            <NavLink to="/clothing-products/logout">Logout</NavLink>
          </>
        )}
      </div>

      <div className="adminNav">
        {user?.role === RoleModel.Admin && (
          <>
            <NavLink title="Add Product" to="/clothing-products/add">
              <FaPlus style={FaPlusStyling}></FaPlus>
            </NavLink>
            <NavLink to="/clothing-products/logout">Logout</NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthMenu;
