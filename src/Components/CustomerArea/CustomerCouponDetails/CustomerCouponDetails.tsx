import { useEffect, useState } from "react";
import Coupon from "../../../Models/Coupon";
import "./CustomerCouponDetails.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import customerService from "../../../Services/CustomerService";
import notificationsService from "../../../Services/NotificationsServise";
import { authStore } from "../../../Store/AuthState";

// A component to see a coupon details for a customer, with a function to purchase it.
function CustomerCouponDetails(): JSX.Element {

    const [getCoupon, setCoupon] = useState<Coupon>();
    const id: number = +useParams().couponId;
    const navigate = useNavigate();

    useEffect(() => {
        if (!authStore.getState().token) {
            notificationsService.error("unauthorize, please log in");
            navigate("/home");
            return;
        }

        // to get the specific coupon details using the customerService
        customerService.getAllCoupons()
            .then(cs => setCoupon(cs.find(c => c.id == id)))
            .catch(err => notificationsService.error(err));
    }, []);

    // a function to purchase a coupon if relevant button is pressed using the customerService.
    function purchaseCoupon() {
        customerService.purchaseCoupon(getCoupon)
            .then(msg => notificationsService.success(msg))
            .catch(err => notificationsService.error(err));
    }



    return (
        <div className="CustomerCouponDetails">
            <NavLink to="/customer"><button>back</button></NavLink>
            {!getCoupon && <p>Sorry, cannot find the coupon...</p>}

            {getCoupon &&
                <div>
                    <h2>title: {getCoupon?.title}</h2>
                    <img src={"" + getCoupon?.image} alt={getCoupon.title} />
                    <h3>💲 {getCoupon?.price}</h3>
                    <p>company: {getCoupon?.company.name}</p>
                    <p>from the {getCoupon?.category} category</p>
                    <p>start date: {getCoupon?.startDate?.toString()}</p>
                    <p>expires at: {getCoupon?.endDate?.toString()}</p>
                    <p>only {getCoupon?.amount} left in stock</p>
                    <p>a little about the coupon: {getCoupon?.description}</p>

                    <button onClick={purchaseCoupon}>bye me:)</button>
                </div>
            }

        </div>
    );
}

export default CustomerCouponDetails;
