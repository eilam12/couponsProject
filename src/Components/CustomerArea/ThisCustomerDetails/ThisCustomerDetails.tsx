import { useEffect, useState } from "react";
import "./ThisCustomerDetails.css";
import Customer from "../../../Models/Customer";
import customerService from "../../../Services/CustomerService";
import notificationsService from "../../../Services/NotificationsServise";
import { authStore } from "../../../Store/AuthState";
import { useNavigate } from "react-router-dom";

// A component to for a customer to see its own details
function ThisCustomerDetails(): JSX.Element {

    const [getCustomer, setCustomer] = useState<Customer>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authStore.getState().token) {
            notificationsService.error("unauthorize, please log in");
            navigate("/home");
            return;
        }

        // to get the specific customer details using the customerService
        customerService.getCustomerDetails()
            .then(customer => setCustomer(customer))
            .catch(err => notificationsService.error(err));
    }, [])

    return (
        <div className="ThisCustomerDetails">

            <h2>First name: {getCustomer?.firstName}</h2>
            <h2>Last name: {getCustomer?.lastName}</h2>
            <h3>Email: {getCustomer?.email}</h3>
            <p>Amount of purchased coupons: {getCustomer?.coupons?.length} </p>

        </div>
    );
}

export default ThisCustomerDetails;
