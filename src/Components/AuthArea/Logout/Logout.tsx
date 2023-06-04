import { useNavigate } from "react-router-dom";
import "./Logout.css";
import authService from "../../../Services/AuthService";
import notificationsService from "../../../Services/NotificationsServise";
import { authStore } from "../../../Store/AuthState";
import { useEffect, useState } from "react";

function Logout(): JSX.Element {

    const navigate = useNavigate();
    const [token, setToken] = useState<string>();

    useEffect(() => {
        setToken(authStore.getState().token);
        const unsubscribe = authStore.subscribe(() => setToken(authStore.getState().token));

        return () => {
            unsubscribe();
        }
    }, []);

    function logout() {
        authService.Logout()
            .then(msg => {
                notificationsService.success(msg);
                navigate("/home");
            })
            .catch(err => notificationsService.error(err));
    }

    return (
        <div className="Logout">
            {token && 
                <button onClick={logout}>logout</button>
            }
        </div>
    );
}

export default Logout;
