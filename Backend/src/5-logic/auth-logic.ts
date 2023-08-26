import { UnauthorizedError, ConflictError } from "../4-models/client-errors";
import { ICredentialsModel } from "../4-models/credentials-model";
import { IUserModel, UserModel } from "../4-models/user-model";
import RoleModel from "../4-models/role-model";
import hash from "../2-utils/cyber";
import auth from "../2-utils/auth";

async function register(user: IUserModel): Promise<string> {
  const existingUsers = await UserModel.find({username: user.username}).exec();
  if (existingUsers && existingUsers.length > 0) {
    throw new ConflictError("Username Already Exists");
  }

  user.password = hash(user.password);
  user.role = RoleModel.User;
  await user.save();

  const tokenData = user.toObject<IUserModel>()
  delete tokenData.password;
  const token = auth.generateNewToken(tokenData);
  return token;
}

async function login(credentials: ICredentialsModel): Promise<string> {
  credentials.password = hash(credentials.password);
  const credentialPassword = credentials.password;
  const credentialUsername = credentials.username;
  const users = await UserModel.find().exec();
  const existingUser = users.find(
    (u) =>
      u.password === credentialPassword && u.username === credentialUsername
  );
  
  if (!existingUser) {
    throw new UnauthorizedError("Incorrect Username or Password");
  }
  delete existingUser.password;
  const token = auth.generateNewToken(existingUser);
  return token;
}

export default {
  register,
  login,
};
