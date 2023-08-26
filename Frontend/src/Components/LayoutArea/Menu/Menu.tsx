import { NavLink } from "react-router-dom";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
            <NavLink to="/clothing-products/login">Login</NavLink>
            <span> | </span>
            <NavLink to="/clothing-products/register">Register</NavLink>
        </div>
    );
}

export default Menu;
