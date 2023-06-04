import { useEffect, useState } from "react";
import Coupon from "../../../Models/Coupon";
import "./CouponDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import companyService from "../../../Services/CompanyService";
import notificationsService from "../../../Services/NotificationsServise";
import { NavLink } from "react-router-dom";
import { authStore } from "../../../Store/AuthState";

// A component to see a coupon details with functions the system have about coupon, only a company is authorized for.
function CouponDetails(): JSX.Element {

    const [getCoupon, setCoupon] = useState<Coupon>();
    const id: number = +useParams().couponId;
    const navigate = useNavigate();

    useEffect(() => {
        if (!authStore.getState().token) {
            notificationsService.error("unauthorize, please log in");
            navigate("/home");
            return;
        }

        // to get the specific coupon details using the companyService
        companyService.getCompanyCoupons()
            .then(cs => setCoupon(cs.find(c => c.id == id)))
            .catch(err => notificationsService.error(err));
    }, [])

    // a function to delete the coupon using the companyService.
    // After successfully delete will navigate to relevant component (the component of all the company coupons)
    function deleteMe() {
        companyService.deleteCoupon(id)
            .then(msg => {
                notificationsService.success(msg);
                navigate("/company/coupons");
            })
            .catch(err => notificationsService.error(err));
    }

    // a function to navigate to the component of updating the coupon if relevant button was pressed
    function updateCoupon() {
        navigate("/company/coupons/edit/" + id);
    }

    return (
        <div className="CouponDetails">
            <NavLink to="/company/coupons"> <button>back</button></NavLink>
            {!getCoupon && <p>Sorry, cannot find the coupon...</p>}

            {getCoupon && authStore.getState().clientType.toString() == "COMPANY" &&
                <div>
                    <h2>{getCoupon?.title}</h2>
                    <img src={"" + getCoupon?.image} alt={getCoupon.title} />
                    <h3>💲 {getCoupon?.price}</h3>
                    <p>{getCoupon?.company.name}</p>
                    <p>from the {getCoupon?.category} category</p>
                    <p>start date: {getCoupon?.startDate?.toString()}</p>
                    <p>expires at: {getCoupon?.endDate?.toString()}</p>
                    <p>only {getCoupon?.amount} left in stock</p>
                    <p>a little about the coupon: {getCoupon?.description}</p>

                    <button onClick={updateCoupon}>edit</button><br />
                    <button onClick={deleteMe}>delete</button>
                </div>
            }

        </div>
    );
}

export default CouponDetails;
