import ProductModel from "../Models/ProductModel";
import { createStore }  from "redux"

// 1. State
export class ProductsState {
  public products: ProductModel[] = []; // Global data
}

// 2. Action Type
export enum ProductsActionType {
  FetchProducts, // Fetch all products from backend
  AddProduct, // Add new product
  UpdateProduct, // Update existing product
  DeleteProduct, // Delete existing product
}

// 3. Action
export interface ProductsAction {
  type: ProductsActionType; // The operation will be taken
  payload: any; // Data we sending
}

// 4. Reducer
export function ProductsReducer(
  currentState = new ProductsState(),
  action: ProductsAction
): ProductsState {
  const newState = { ...currentState };
//   console.log("newState");
//   console.log(newState);
//   console.log("newState");
  switch (action.type) {
    case ProductsActionType.FetchProducts:
      newState.products = action.payload;
    //   console.log("ProductsActionType");
    //   console.log(newState.products);
    //   console.log("ProductsActionType");
      break;

    case ProductsActionType.AddProduct:
      newState.products.push(action.payload);
      break;

    case ProductsActionType.UpdateProduct:
      const indexToUpdate = newState.products.findIndex((p) => p._id === action.payload._id);
      if (indexToUpdate >= 0) {
        newState.products[indexToUpdate] = action.payload;
      }
      break;

    case ProductsActionType.DeleteProduct:
      const indexToDelete = newState.products.findIndex(
        (p) => p._id === action.payload._id
      );
      if (indexToDelete >= 0) {
        newState.products.splice(indexToDelete, 1);
      }
      break;
  }

  return newState; // return new state;
}

// 5. Store
export const productsStore = createStore(ProductsReducer);
