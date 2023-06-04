import { useNavigate } from "react-router-dom";
import { authStore } from "../../../Store/AuthState";
import GetAllCoupons from "../GetAllCoupons/GetAllCoupons";
import "./CustomerPage.css";
import { useEffect } from "react";
import notificationsService from "../../../Services/NotificationsServise";

function CustomerPage(): JSX.Element {

    const navigate = useNavigate();
    useEffect(() => {
        if (!authStore.getState().token) {
            notificationsService.error("unauthorize, please log in");
            navigate("/home");
            return;
        }
    }, []);

    return (
        <div className="CustomerPage">

            <h2>hello {authStore.getState().name}!</h2>

            <div>
                <GetAllCoupons />
            </div>

        </div>
    );
}

export default CustomerPage;
