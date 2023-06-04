import { useEffect, useRef, useState } from "react";
import "./CustomerCoupons.css";
import Coupon from "../../../Models/Coupon";
import customerService from "../../../Services/CustomerService";
import notificationsService from "../../../Services/NotificationsServise";
import CustomerCouponCard from "../CustomerCouponCard/CustomerCouponCard";
import { useNavigate } from "react-router-dom";
import { authStore } from "../../../Store/AuthState";

// A component to get and see all the coupons that the specific customer purchased. Only A customer would have access to it.
function CustomerCoupons(): JSX.Element {

    const [getCoupons, setCoupons] = useState<Coupon[]>([]);
    const inputRef = useRef(null);
    const inputRef2 = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authStore.getState().token) {
            notificationsService.error("unauthorize, please log in");
            navigate("/home");
            return;
        }

        // to get the purchases of the customer using the customerService
        customerService.getCustomerCoupons()
            .then(coupons => setCoupons(coupons))
            .catch(err => notificationsService.error(err));
    }, []);

    // a function to filter the coupons by a max price using the customerService, if relevant button was pressed.
    // if pressed the function will set the coupons in the component and by that only the relevent coupons 
    // will be showed. getting the input from the user by using useRef.
    function byMaxPrie() {
        if (inputRef.current.value > 0) {
            customerService.getCustomerCouponsByMaxPrice(inputRef.current.value)
                .then(coupons => setCoupons(coupons))
                .catch(err => notificationsService.error(err));
        }
    }

    // a function to filter the coupons by a category using the customerService, if relevant button was pressed.
    // if pressed the function will set the coupons in the component and by that only the relevent coupons 
    // will be showed. getting the input from the user by using useRef.
    function byCategory() {
        if (inputRef2.current.value != "none") {
            customerService.getCustomerCouponsByCategory(inputRef2.current.value)
                .then(coupons => setCoupons(coupons))
                .catch(err => notificationsService.error(err));
        }
    }

    // a function to get back all the coupons of the company using the customerService if the coupons filtered before.
    function backToAll() {
        customerService.getCustomerCoupons()
            .then(coupons => setCoupons(coupons))
            .catch(err => notificationsService.error(err));
    }




    return (
        <div className="CustomerCoupons">

            <h4>Amount of purchases: {getCoupons?.length}</h4>

            <button onClick={backToAll}>back to all coupons</button>

            <div id="filters">
                <input ref={inputRef} type="number" placeholder="max price" min={0} />
                <button onClick={byMaxPrie}>filter by price</button>

                <select ref={inputRef2}>
                    <option>none</option>
                    <option>SPORT</option>
                    <option>FOOD</option>
                    <option>SPA</option>
                    <option>BEVERAGES</option>
                    <option>TRAVEL</option>
                </select>
                <button onClick={byCategory}>filter by category</button>
            </div>

            <div>
                {getCoupons.map(c => <CustomerCouponCard key={c.id} coupon={c} />)}
            </div>
        </div>
    );
}

export default CustomerCoupons;
