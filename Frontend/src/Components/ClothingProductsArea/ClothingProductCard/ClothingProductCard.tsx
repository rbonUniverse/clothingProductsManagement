import productsService from "../../../Services/ProductsServices";
import notifyService from "../../../Services/NotifyService";
import ProductModel from "../../../Models/ProductModel";
import { NavLink, useNavigate } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import UserModel from "../../../Models/UserModel";
import RoleModel from "../../../Models/RoleModel";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "./ClothingProductCard.css";

interface ProductCardProps {
  product: ProductModel;
}

function ClothingProductCard(props: ProductCardProps): JSX.Element {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserModel | null>(null);
   
  useEffect(() => {
    setUser(authStore.getState().user);

    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });

    // Return a function which will be called when component is about to be destroyed:
    return () => unsubscribe();
  }, []);

  async function deleteProduct() {
    try {
      const iAmSure = window.confirm("Delete this product ?");
      if (!iAmSure) return;

      await productsService.deleteProduct(props.product._id!);
      notifyService.success("Product has been deleted !!!");
      navigate("/clothing-products");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="ClothingProductCard">
      <div className="userCardNav">
        {user?.role === RoleModel.User && <></>}
      </div>

      <div className="adminCardNav">
        {user?.role === RoleModel.Admin && (
          <>
            <Button title="Delete Product" onClick={deleteProduct}>
              <FaTrash className="FaTrash" />
            </Button>
            <NavLink
              title="Edit Product"
              to={`/clothing-products/update/${props.product._id}`}
            >
              <FaEdit className="FaEdit" />
            </NavLink>
          </>
        )}
      </div>
      <div className="card">
        <br />
        <div className="text">
          <span> Brand: {props.product.brand}</span>
          <br />
          <br />
          <span> Clothing Type: {props.product.clothingType}</span>
          <br />
          <br />
          <span> Price: {props.product.price}</span>
          <br />
          <br />
          <span> Material: {props.product.material}</span>
        </div>
      </div>
    </div>
  );
}

export default ClothingProductCard;
