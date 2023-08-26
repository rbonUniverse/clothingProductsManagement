import ClothingProductsList from "../../ClothingProductsArea/ClothingProductsList/ClothingProductsList";
import AddClothingProduct from "../../ClothingProductsArea/AddClothingProduct/AddClothingProduct";
import EditClothingProduct from "../../ClothingProductsArea/EditClothingProduct/EditClothingProduct";
import { Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "../PageNotFound/PageNotFound";
import Register from "../../AuthArea/Register/Register";
import Logout from "../../AuthArea/Logout/Logout";
import Login from "../../AuthArea/Login/Login";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                {/* Login */}
                <Route path="/clothing-products/login" element={<Login />} />

                {/* Logout */}
                <Route path="/clothing-products/logout" element={<Logout />} />

                {/* Register */}
                <Route path="/clothing-products/register" element={<Register />} />

                {/* All Clothing Product */}
                <Route path="/clothing-products" element={<ClothingProductsList />} />

                {/* Add New Clothing Product */}
                <Route path="/clothing-products/add" element={<AddClothingProduct />} />

                {/* Edit Product */}
                <Route path="/clothing-products/update/:_id" element={<EditClothingProduct />} />

                {/* Default Route */}
                <Route path="/" element={<Navigate to="/clothing-products/login" />} />

                 {/* Page not found */}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default Routing;
