import productsService from "../../../Services/ProductsServices";
import { Button, TextField, Typography } from "@mui/material";
import notifyService from "../../../Services/NotifyService";
import useVerifyAdmin from "../../../Utils/useVerifyAdmin";
import { useNavigate, useParams } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import "./EditClothingProduct.css";

function EditClothingProduct(): JSX.Element {
  // Verify that user is Admin
  useVerifyAdmin();

  const params = useParams();
  const _id = params._id!;

  const navigate = useNavigate();
  const { register, handleSubmit, formState, setValue } =
    useForm<ProductModel>();

  useEffect(() => {
    productsService
      .getOneProduct(_id)
      .then((product: ProductModel) => {
        setValue("_id", product._id);
        setValue("brand", product.brand);
        setValue("clothingType", product.clothingType);
        setValue("price", product.price);
        setValue("material", product.material);
      })
      .catch((err: any) => notifyService.error(err));
  }, []);

  async function send(product: ProductModel) {
    try {
      await productsService.updateProduct(product);
      notifyService.success("Clothing Product has been updated");
      navigate("/clothing-products");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  async function cancelEdit() {
    try {
      navigate("/clothing-products");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="EditClothingProduct">
      <form onSubmit={handleSubmit(send)}>
        <Typography variant="h2" className="Headline">
          &nbsp;&nbsp; Edit Clothing Product
        </Typography>
        <div className="edit-clothing-fields">
            <input type="hidden" {...register("_id")} />

            <TextField required type="text" label="Brand" className="brand" variant="outlined" {...register("brand", {
                required: { value: true, message: "Brand missing" },
                minLength: { value: 2, message: "Brand field is short" },
                maxLength: { value: 30, message: "Brand is too long" },
            })} />
            <span>{formState.errors.brand?.message}</span>

            <TextField required type="text" label="ClothingType" className="clothingType" variant="outlined" {...register("clothingType", {
                required: { value: true, message: "Clothing Type missing" },
                minLength: { value: 2, message: "Clothing Type field is short" },
                maxLength: { value: 30, message: "Clothing Type is too long" },
            })} />
            <span>{formState.errors.clothingType?.message}</span>

            <TextField required type="number" label="Price" className="price" variant="outlined" {...register("price", {
                required: { value: true, message: "Missing price" },
                min: { value: "1", message: "Price too low" },
                max: { value: "10000", message: "Price too high" },
            })} />
            <span>{formState.errors.price?.message}</span>

            <TextField required type="text" label="Material" className="material" variant="outlined" {...register("material", {
                required: { value: true, message: "Material missing" },
                minLength: { value: 2, message: "Material field is short" },
                maxLength: { value: 30, message: "Material Type is too long" },
            })}/>
            <span>{formState.errors.material?.message}</span>
        </div>
        <Button type="submit">Update</Button>
        <Button onClick={cancelEdit}>Cancel</Button>
      </form>
    </div>
  );
}

export default EditClothingProduct;
