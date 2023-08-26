import jwtDecode from "jwt-decode";
import UserModel from "../Models/UserModel";
import { createStore }  from "redux"

// 1. State
export class AuthState {
  public token: string | null = null;
  public user: UserModel | null = null;
}

// 2. Action Type
export enum AuthActionType {
  Register,
  Login,
  Logout,
}

// 3. Action
export interface AuthAction {
  type: AuthActionType;
  payload?: string;
}

// 4. Reducer
export function AuthReducer(
  currentState = new AuthState(),
  action: AuthAction
) {
  const newAuthState = { ...currentState };

  switch (action.type) {
    case AuthActionType.Register:
    case AuthActionType.Login:
      newAuthState.token = action.payload!;
        const container: { user: UserModel } = jwtDecode(newAuthState.token);
        newAuthState.user = container.user;
      break;

    case AuthActionType.Logout:
      newAuthState.token = null;
      newAuthState.user = null;
      break;
  }
  return newAuthState;
}

// 5. Store
export const authStore = createStore(AuthReducer);
