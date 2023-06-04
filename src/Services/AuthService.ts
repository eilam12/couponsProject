import axios from "axios";
import { Credentials } from "../Models/Credentials";
import { authStore, loginAction, logoutAction } from "../Store/AuthState";
import { companyStore } from "../Store/CompanyState";
import { adminStore } from "../Store/AdminState";
import { customerStore } from "../Store/CustomerState";

/**
 * AuhtService class is the service class for authorization actions like login and logout.
 * It give's access to the server side by connecting to the relevant controllers and end points
 * in the server.
 */
class AuthService {

    /**
     * This method is to login in the system by connecting to the relevant end point in the server.
     * It send the credentials for login. If the login succeed than getting a response with a token and saving 
     * it in using the authStore for further identification with the server side.
     * @param creds is the model with the credentials for login. 
     * @returns token
     */
    public async Login(creds: Credentials) {
        const token = (await axios.post<string>("http://localhost:8080/auth/login/" + creds.clietType + "/" + creds.email + "/" + creds.password)).data;
        authStore.dispatch(loginAction(token));
        return token;
    }

    /**
     * This method is to logout from the system by connecting to the relevant end point in the server.
     * It ckecks what kind of ClientType is performing the logout and clean the store accordingly.
     * then using the authStore to delete the token from the store.
     * @returns response.data
     */
    public async Logout() {
        const response = (await axios.get<string>("http://localhost:8080/auth/logout")).data;

        if (authStore.getState().clientType.toString() == "ADMINISTRATOR") {  // to clear the store
            adminStore.getState().companies = new Array;
            adminStore.getState().customers = new Array;
        }
        else if (authStore.getState().clientType.toString() == "COMPANY") {   // to clear the store
            companyStore.getState().coupons = new Array;
            companyStore.getState().company = null;
        }
        else if (authStore.getState().clientType.toString() == "CUSTOMER") {  // to clear the store
            customerStore.getState().coupons = new Array;
            customerStore.getState().customer = null;
        }
        authStore.dispatch(logoutAction());
        return response;
    }
}
const authService = new AuthService;
export default authService;