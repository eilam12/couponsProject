import { NavLink } from "react-router-dom";
import "./Menu.css";
import { authStore } from "../../../Store/AuthState";
import { useEffect, useState } from "react";

function Menu(): JSX.Element {

    const [token, setToken] = useState<string>();

    useEffect(() => {
        setToken(authStore.getState().token);
        const unsubscribe = authStore.subscribe(() => (setToken(authStore.getState().token)));

        return () => {
            unsubscribe();
        }
    }, []);


    return (
        <div className="Menu">

            {token &&
                authStore.getState().clientType.toString() == "ADMINISTRATOR" && <>
                    <NavLink to="/administrator">Home&nbsp;&nbsp;&nbsp;&nbsp;</NavLink>
                    <NavLink to="/administrator/companies">Companies&nbsp;&nbsp;&nbsp;&nbsp;</NavLink>
                    <NavLink to="/administrator/customers">Customers&nbsp;&nbsp;&nbsp;&nbsp;</NavLink>
                    <NavLink to="/administrator/addCompany">Add Company&nbsp;&nbsp;&nbsp;&nbsp;</NavLink>
                    <NavLink to="/administrator/addCustomer">Add Customer</NavLink>
                </>
            }

            {token &&
                authStore.getState().clientType.toString() == "COMPANY" && <>
                    <NavLink to="/company">Home&nbsp;&nbsp;&nbsp;&nbsp;</NavLink>
                    <NavLink to="/company/coupons">My Coupons&nbsp;&nbsp;&nbsp;&nbsp;</NavLink>
                    <NavLink to="/company/addCoupon">Add Coupon&nbsp;&nbsp;&nbsp;&nbsp;</NavLink>
                    <NavLink to="/company/details">My details&nbsp;&nbsp;&nbsp;&nbsp;</NavLink>
                </>}

            {token &&
                authStore.getState().clientType.toString() == "CUSTOMER" && <>
                    <NavLink to="/customer">Home&nbsp;&nbsp;&nbsp;&nbsp;</NavLink>
                    <NavLink to="/customer/coupons">my coupons&nbsp;&nbsp;&nbsp;&nbsp;</NavLink>
                    <NavLink to="/customer/details">my details&nbsp;&nbsp;&nbsp;&nbsp;</NavLink>
                </>}

        </div >
    );
}

export default Menu;
