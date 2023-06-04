import jwtDecode from "jwt-decode";
import ClientType from "../Models/ClientType";
import { createStore } from "redux";

export class AuthState {
    public token: string = null;
    public clientType: ClientType = null;
    public name: string = null;

    constructor() {
        if (sessionStorage.token) {
            this.token = sessionStorage.token;
            const container: { clientType: ClientType, name: string } = jwtDecode(this.token);
            this.clientType = container.clientType;
            this.name = container.name;
        }
    }
}

export enum AuthActiontTypes {
    Login, Logout
}

export interface AuthAction {
    type: AuthActiontTypes,
    payload?: any
}

export function loginAction(token: string) {
    return { type: AuthActiontTypes.Login, payload: token }
}

export function logoutAction() {
    return { type: AuthActiontTypes.Logout }
}

export function authReducer(currentState = new AuthState(), action: AuthAction) {

    const newState = { ...currentState }; // duplicate of current state

    switch (action.type) {
        case AuthActiontTypes.Login:  // payload is token
            const token = action.payload;
            newState.token = token;
            const container: { clientType: ClientType, name: string } = jwtDecode(token);
            newState.clientType = container.clientType;
            newState.name = container.name;
            sessionStorage.token = token;
            break;

        case AuthActiontTypes.Logout:
            newState.token = null;
            newState.clientType = null;
            newState.name = null;
            sessionStorage.removeItem("token");
            break;
    }

    return newState;
}

export const authStore = createStore(authReducer);

