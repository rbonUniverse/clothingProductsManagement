import { IdNotFoundError, ValidationError } from "../4-models/client-errors";
import { IClothingModel, ClothingModel } from "../4-models/clothing-model";

// GET all clothing product:
async function getAllClothing(): Promise<IClothingModel[]> {
  // Return all categories with the specified virtual fields:
  return ClothingModel.find().exec();
}

// GET one clothing product:
async function getOneClothingItem(_id: string): Promise<IClothingModel> {
  const clothingProduct = await ClothingModel.findById(_id).exec();
  if (!clothingProduct) {
    throw new IdNotFoundError(_id);
  }
  return clothingProduct;
}

// Add clothing product:
async function addClothingProduct(
  clothingProduct: IClothingModel
): Promise<IClothingModel> {
  const addedClothingProduct = new ClothingModel(clothingProduct);
  
  const errors = addedClothingProduct.validateSync();
  if (errors) {
    throw new ValidationError(errors.message);
  }

  return addedClothingProduct.save();
}

// Update clothing product:
async function updateClothingProduct(clothingProduct: IClothingModel): Promise<IClothingModel> {
  const newUpdate = new ClothingModel(clothingProduct);
  const errors = newUpdate.validateSync();
  if (errors) {
    throw new ValidationError(errors.message);
  }

  return await newUpdate.updateOne({ $set: clothingProduct }).exec();
}

// Delete clothing Item:
async function deleteClothingItem(_id: string): Promise<void> {
  const deletedItem = await ClothingModel.findByIdAndDelete(_id).exec();
  if (!deletedItem) {
    throw new IdNotFoundError(_id);
  }
}

export default {
  getAllClothing,
  getOneClothingItem,
  addClothingProduct,
  updateClothingProduct,
  deleteClothingItem,
};
