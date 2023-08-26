import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import { Typography } from "@mui/material";
import "./Header.css";

function Header(): JSX.Element {
  return (
    <div className="Header">
      <Typography variant="h2" className="Products">
        &nbsp;&nbsp; Clothing Products
      </Typography>
      <AuthMenu />
    </div>
  );
}

export default Header;
