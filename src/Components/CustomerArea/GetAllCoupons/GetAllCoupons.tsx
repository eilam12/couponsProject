import { useEffect, useState } from "react";
import Coupon from "../../../Models/Coupon";
import "./GetAllCoupons.css";
import notificationsService from "../../../Services/NotificationsServise";
import CouponCard from "../../CouponArea/CouponCard/CouponCard";
import customerService from "../../../Services/CustomerService";
import { useNavigate } from "react-router-dom";
import { authStore } from "../../../Store/AuthState";

// A component to get and see all the coupons. Only a customer would have access to it so he could see the coupons 
// and make purchases.
function GetAllCoupons(): JSX.Element {

    const [couponsArray, setCoupons] = useState<Coupon[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authStore.getState().token) {
            // notificationsService.error("unauthorize, please log in");
            navigate("/home");
            return;
        }

        // to get all coupons using the customerService.
        customerService.getAllCoupons()
            // set state with Coupon[] from server
            .then(coupons => setCoupons(coupons))
            .catch(err => notificationsService.error(err));
    }, []);


    return (
        <div className="GetAllCoupons">
            {couponsArray.map(c => <CouponCard key={c.id} coupon={c} />)}
        </div>
    );
}

export default GetAllCoupons;
