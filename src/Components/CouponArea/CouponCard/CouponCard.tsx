import { NavLink } from "react-router-dom";
import Coupon from "../../../Models/Coupon";
import "./CouponCard.css";
import { authStore } from "../../../Store/AuthState";
import customerService from "../../../Services/CustomerService";
import notificationsService from "../../../Services/NotificationsServise";

// A component of a form to display a coupon to users, a coupon card.
interface CouponsProps {
    coupon: Coupon;
}

function CouponCard(props: CouponsProps): JSX.Element {

    // a function to purchase a coupon if relevant button is pressed.
    // only a customer will see a button for purchase because only a customer can purchase a coupon.
    function purchaseCoupon() {
        customerService.purchaseCoupon(props.coupon)
            .then(msg => notificationsService.success(msg))
            .catch(err => notificationsService.error(err));
    }

    return (
        
        // the card will be display a little different according to the type of the client
        // by checking the clientType in the authStore.
        <div className="CouponCard">
            
            {authStore.getState().token && authStore.getState().clientType.toString() == "COMPANY" && <>
                <NavLink to={"/company/coupons/" + props.coupon.id}>
                    <h3>{props.coupon.title}</h3>
                </NavLink>
                <img src={"" + props.coupon.image} alt={props.coupon.title} />
                <p>Price: {props.coupon.price}</p>

            </>
            }


            {authStore.getState().token && authStore.getState().clientType.toString() == "CUSTOMER" && <>
                <NavLink to={"/customer/coupons/" + props.coupon.id}>
                    <h3>{props.coupon.title}</h3>
                </NavLink>
                <img src={"" + props.coupon.image} alt={props.coupon.title} />
                <p>Price: {props.coupon.price}</p>
                <button onClick={purchaseCoupon}>bye me:)</button>
            </>
            }

            {authStore.getState().token && authStore.getState().clientType.toString() == "ADMINISTRATOR" && <>
                <h3>{props.coupon.title}</h3>
                <img src={"" + props.coupon.image} alt={props.coupon.title} />
                <p>Price: {props.coupon.price}</p>
            </>
            }


        </div>
    );
}

export default CouponCard;
