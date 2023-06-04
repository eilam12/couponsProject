import "./CompanyPage.css";
import { authStore } from "../../../Store/AuthState";
import { useNavigate } from "react-router-dom";
import notificationsService from "../../../Services/NotificationsServise";
import { useEffect } from "react";

function CompanyPage(): JSX.Element {

    const navigate = useNavigate();
    useEffect(() => {
        if (!authStore.getState().token) {
            notificationsService.error("unauthorize, please log in");
            navigate("/home");
            return;
        }
    }, [])


    return (
        <div className="CompanyPage">

            <h2>Hello {authStore.getState().name}!</h2>

        </div>
    );
}

export default CompanyPage;
