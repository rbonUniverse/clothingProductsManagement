import { IUserModel } from "../4-models/user-model";
import RoleModel from "../4-models/role-model";
import jwt from "jsonwebtoken";

const secretKey = "skjgsbiwfhoiuw";

function generateNewToken(user: IUserModel): string {
  const container = { user };
  const token = jwt.sign(container, secretKey, { expiresIn: "2h" });
  return token;
}

function verifyToken(authHeader: string) {
  return new Promise<boolean>((resolve, reject) => {
    try {
      if (!authHeader) {
        resolve(false);
        return;
      }

      const token = authHeader.substring(7);
      if (!token) {
        resolve(false);
        return;
      }

      jwt.verify(token, secretKey, (err) => {
        if (err) {
          resolve(false);
          return;
        }
        resolve(true);
      });
    } catch (err: any) {
      reject(err);
    }
  });
}

function getUserRoleFromToken(authHeader: string): RoleModel {
  const token = authHeader.substring(7);
  const container = jwt.decode(token) as { user: IUserModel };
  const user = container.user;
  switch (user.role.toString()) {
    case RoleModel.User:
      return RoleModel.User;
    case RoleModel.Admin:
      return RoleModel.Admin;
  }

  throw new Error("Unknown roleId");
}

export default {
  generateNewToken,
  verifyToken,
  getUserRoleFromToken,
};
