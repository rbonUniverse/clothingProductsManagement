import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { authStore } from "../Redux/AuthState";
import { AuthAction, AuthActionType } from "../Redux/AuthState";

class AuthService {
  // Register:
  public async register(user: UserModel): Promise<void> {
    // Send user object to backend, get back token
    const response = await axios.post<string>(
      "http://localhost:3001/api/clothing-products/register",
      user
    );

    // Extract token:
    const token = response.data;

    // Save token in redux global state:
    const action: AuthAction = {
      type: AuthActionType.Register,
      payload: token,
    };
    authStore.dispatch(action);
  }

  // Login:
  public async login(credentials: CredentialsModel): Promise<void> {
    // Send credentials to backend, get back token
    const response = await axios.post<string>(
      "http://localhost:3001/api/clothing-products/login",
      credentials
    );

    // Extract token:
    const token = response.data;

    // Save token in redux global state:
    const action: AuthAction = { type: AuthActionType.Login, payload: token };
    authStore.dispatch(action);
  }

  // Logout
  public logout(): void {
    // Logout in redux global state:
    const action: AuthAction = { type: AuthActionType.Logout };
    authStore.dispatch(action);
  }
}

const authService = new AuthService();

export default authService;
