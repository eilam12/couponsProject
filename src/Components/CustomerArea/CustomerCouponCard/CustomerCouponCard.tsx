import { NavLink } from "react-router-dom";
import Coupon from "../../../Models/Coupon";
import "./CustomerCouponCard.css";

// A component of a form to display a coupon to a customer that already bought that coupon.
interface CouponsProps {
    coupon: Coupon;
}

function CustomerCouponCard(props: CouponsProps): JSX.Element {
    return (
        <div className="CustomerCouponCard">
            <NavLink to={"/customer/myCoupons/" + props.coupon.id}>
                <h3>{props.coupon.title}</h3>
            </NavLink>
            <img src={"" + props.coupon.image} alt={props.coupon.title} />
            <p>Price: {props.coupon.price}</p>
        </div>
    );
}

export default CustomerCouponCard;
