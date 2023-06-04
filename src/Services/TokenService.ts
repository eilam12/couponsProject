import axios from "axios";
import { authStore } from "../Store/AuthState";


/**
 * The tokenInterceptor is a function that responsible to send token in the request's
 * to the server if such token is found.
 */
export function tokenInterceptor() {
    axios.interceptors.request.use((config) => {
        if (authStore.getState().token) {
            config.headers.Authorization = "Bearer " + authStore.getState().token;
        }

        return config;
    })
}

