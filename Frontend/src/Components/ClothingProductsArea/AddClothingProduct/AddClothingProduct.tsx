import productsService from "../../../Services/ProductsServices";
import { Button, TextField, Typography } from "@mui/material";
import notifyService from "../../../Services/NotifyService";
import useVerifyAdmin from "../../../Utils/useVerifyAdmin";
import ProductModel from "../../../Models/ProductModel";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./AddClothingProduct.css";

function AddClothingProduct(): JSX.Element {
    
    useVerifyAdmin();

    const { register, handleSubmit, formState } = useForm<ProductModel>();
    const navigate = useNavigate();

    async function send(product: ProductModel) {
        try {
            await productsService.addProduct(product);
            notifyService.success("Added !!!");
            navigate("/clothing-products");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    async function cancelAdd() {
        try {
            navigate("/clothing-products");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="AddClothingProduct">
            <form onSubmit={handleSubmit(send)}>
                
            <Typography variant="h2" className="Headline">
                &nbsp;&nbsp;
                Add Clothing Product
            </Typography>
                <div className="add-clothing-fields">
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
                    })} />
                    <span>{formState.errors.material?.message}</span>
                </div>
                <Button type="submit">Add</Button>
                <Button onClick={cancelAdd}>Cancel</Button>
            </form>
        </div>
    );
}

export default AddClothingProduct;