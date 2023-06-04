import "./AdminPage.css";
import { authStore } from "../../../Store/AuthState";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import notificationsService from "../../../Services/NotificationsServise";

function AdminPage(): JSX.Element {

    const navigate = useNavigate();
    useEffect(() => {
        if (!authStore.getState().token) {
            notificationsService.error("unauthorize, please log in");
            navigate("/home");
            return;
        }
    }, []);

    return (
        <div className="AdminPage">

            <h2>Hello {authStore.getState().name}!</h2>

        </div>
    );
}

export default AdminPage;
