import axios from "axios";
import ProductModel from "../Models/ProductModel";
import { productsStore } from "../Redux/ClothingProductsState";
import {
  ProductsAction,
  ProductsActionType,
} from "../Redux/ClothingProductsState";

class ProductsService {
  // Get all products from backend:
  public async getAllProducts(): Promise<ProductModel[]> {
    // Take products resides in redux global state:
    let products = productsStore.getState().products;

    // If there no products in global state - fetch them from server:
    if (products.length === 0) {
      // Fetch all products from axios response:
      const response = await axios.get<ProductModel[]>(
        "http://localhost:3001/api/clothing-products"
      );

      // Extract products from axios response:
      products = response.data;

      // Save fetch products in global state:
      const action: ProductsAction = {
        type: ProductsActionType.FetchProducts,
        payload: products,
      };
      productsStore.dispatch(action);
    }
    // Return products
    return products;
  }

  // Get one product from backend:
  public async getOneProduct(_id: string): Promise<ProductModel> {
    // Take products resides in redux global state:
    let products = productsStore.getState().products;

    if (products.length > 0) {
      const product = products.find((p: ProductModel) => p._id === _id);
      return product!;
    }
    // Fetch all products from axios response:
    const response = await axios.get<ProductModel>(
      `http://localhost:3001/api/clothing-products/update/${_id}`
    );

    const product = response.data;
    return product;
  }

  // Add new product:
  public async addProduct(product = new ProductModel()): Promise<void> {
    // Send product to backend:
    const response = await axios.post<ProductModel>(
      "http://localhost:3001/api/clothing-products/add",
      product
    );
    const addedProduct: ProductModel = response.data;

    // Send added product to redux global state:
    const action: ProductsAction = {
      type: ProductsActionType.AddProduct,
      payload: addedProduct,
    };
    // Call productsReducer to perform this action.
    productsStore.dispatch(action);
  }

  // Update product:
  public async updateProduct(product: ProductModel): Promise<void> {
    // Update and send to backend:
    const response = await axios.put<ProductModel>(
      `http://localhost:3001/api/clothing-products/update/${product._id}`,
      product
    );
    const updatedProduct: ProductModel = response.data;
        
    // Send updated product to redux global state:
    const action: ProductsAction = {
      type: ProductsActionType.UpdateProduct,
      payload: updatedProduct,
    };
    // Call productsReducer to perform this action.
    productsStore.dispatch(action);
  }

  // Delete product:
  public async deleteProduct(_id: string): Promise<void> {
    // Delete the product from backend:
    await axios.delete(`http://localhost:3001/api/clothing-products/${_id}`);

    // Delete this product in redux global state:
    const action: ProductsAction = {
      type: ProductsActionType.DeleteProduct,
      payload: _id,
    };
    // Call Product reducer to perform this action
    productsStore.dispatch(action);
  }
}

const productsService = new ProductsService();

export default productsService;
