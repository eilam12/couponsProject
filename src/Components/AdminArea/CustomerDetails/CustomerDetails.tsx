import { useEffect, useState } from "react";
import "./CustomerDetails.css";
import Customer from "../../../Models/Customer";
import { useNavigate, useParams } from "react-router-dom";
import adminServise from "../../../Services/AdminService";
import notificationsService from "../../../Services/NotificationsServise";
import CouponCard from "../../CouponArea/CouponCard/CouponCard";
import { authStore } from "../../../Store/AuthState";

// A component to see a customer details with functions the system have about customer, only an admin is authorized for.
function CustomerDetails(): JSX.Element {

    const [getCustomer, setCustomer] = useState<Customer>();
    const id: number = +useParams().customerId;
    const navigate = useNavigate();

    useEffect(() => {
        if (!authStore.getState().token) {
            notificationsService.error("unauthorize, please log in");
            navigate("/home");
            return;
        }
        // to get the specific customer details using the adminService
        adminServise.getOneCustomer(id)
            .then(customer => setCustomer(customer))
            .catch(err => notificationsService.error(err));
    }, [])

    // a function to delete the customer using the adminService.
    // After successfully delete will navigate to relevant component (the component of all customers)
    function deleteMe() {
        adminServise.deleteCustomer(id)
            .then(msg => {
                notificationsService.success(msg);
                navigate("/administrator/customers")
            })
            .catch(err => notificationsService.error(err));
    }

    // a function to navigate to the component of updating the customer if relevant button was pressed
    function updateCustomer() {
        navigate("/administrator/customers/edit/" + id);
    }

    // a function to navigate to the component of all customers if relevant button was pressed
    function back() {
        navigate("/administrator/customers");
    }



    return (
        <div className="CustomerDetails">
            <button onClick={back}>back</button>
            {!getCustomer && <p>Sorry, cannot find the customer...</p>}

            {getCustomer &&
                <div>
                    <h2>First name: {getCustomer?.firstName}</h2>
                    <h3>Last name: {getCustomer?.lastName}</h3>
                    <h4>Email: {getCustomer?.email}</h4>
                    <button onClick={updateCustomer}>Edit</button><br /><br />
                    <button onClick={deleteMe}>Delete</button><br />
                </div>
            }
            {getCustomer &&
                <>
                    <p>custmer purchases:</p>
                    {getCustomer?.coupons?.map(c => (<CouponCard key={c.id} coupon={c} />))}
                </>}
        </div>
    );
}

export default CustomerDetails;
