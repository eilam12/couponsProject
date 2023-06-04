import { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import Coupon from "../../../Models/Coupon";
import customerService from "../../../Services/CustomerService";
import notificationsService from "../../../Services/NotificationsServise";
import "./CustomerPurchasedCouponDetails.css";
import { authStore } from "../../../Store/AuthState";

// A component to see a coupon details for a customer that he purchased, with a function to delete the purchase.
function CustomerPurchasedCouponDetails(): JSX.Element {

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
        customerService.getCustomerCoupons()
            .then(cs => setCoupon(cs.find(c => c.id == id)))
            .catch(err => notificationsService.error(err));
    }, [])

    // a function to delete the purchase if relevant button is pressed using the customerService.
    // after deleting will be navigate to relevant component(the customer purchases) using useNavigate. 
    function deletePurchase() {
        customerService.deletePurchase(id)
            .then(msg => {
                notificationsService.success(msg);
                navigate("/customer/coupons");
            })
            .catch(err => notificationsService.error(err));
    }


    return (
        <div className="CustomerPurchasedCouponDetails">
            <NavLink to="/customer/coupons"><button>back</button></NavLink>
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

                    <button onClick={deletePurchase}>delete purchase</button>

                </div>
            }

        </div>
    );
}

export default CustomerPurchasedCouponDetails;
