import express, { NextFunction, Request, Response } from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import verifyAdmin from "../3-middleware/verify-admin";
import clothingLogic from "../5-logic/clothing-logic";

const router = express.Router();

// GET http://localhost:3001/api/clothing-products
router.get("/clothing-products", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
      const clothingProducts = await clothingLogic.getAllClothing();
      response.status(200).json(clothingProducts);
    } catch (err: any) {
      next(err);
    }
  }
);

// GET http://localhost:3001/api/clothing-products/:_id
router.get("/clothing-products/:_id", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
      const clothingItemId = request.params._id;
      const oneClothingItem = await clothingLogic.getOneClothingItem(clothingItemId);
      response.status(200).json(oneClothingItem);
    } catch (err: any) {
      next(err);
    }
  }
);

// POST http://localhost:3001/api/clothing-products/add
router.post("/clothing-products/add", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
      const addedClothingProduct = await clothingLogic.addClothingProduct(request.body);
      response.status(201).json(addedClothingProduct);
    } catch (err: any) {
      next(err);
    }
  }
);

// PUT http://localhost:3001/api/clothing-products/update/_id
router.put("/clothing-products/update/:_id", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body._id = request.params._id;
      const updatedProduct = await clothingLogic.updateClothingProduct(request.body);
      response.status(201).json(updatedProduct);
    } catch (err: any) {
      next(err);
    }
  }
);

// DELETE http://localhost:3001/api/clothing-products/delete
router.delete("/clothing-products/:_id", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
      const _id = request.params._id;
      await clothingLogic.deleteClothingItem(_id);
      response.status(204).send();
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
