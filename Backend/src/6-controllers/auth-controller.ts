import express, { NextFunction, Request, Response } from "express";
import { CredentialsModel } from "../4-models/credentials-model";
import { UserModel } from "../4-models/user-model";
import authLogic from "../5-logic/auth-logic";

const router = express.Router();

// POST http://localhost:3001/api/clothing-products/register
router.post("/clothing-products/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
      const body = request.body;
      const user = new UserModel(body);
      const token = await authLogic.register(user);
      response.status(201).json(token);
    } catch (err: any) {
      next(err);
    }
  }
);

// POST http://localhost:3001/api/clothing-products/login
router.post("/clothing-products/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
      const credentials = new CredentialsModel(request.body);
      const token = await authLogic.login(credentials);
      response.json(token);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
