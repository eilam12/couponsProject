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
                    <NavLink to="/administrator">Home</NavLink>
                    <NavLink to="/administrator/companies">Companies</NavLink><br />
                    <NavLink to="/administrator/customers">Customers</NavLink><br />
                    <NavLink to="/administrator/addCompany">Add Company</NavLink><br />
                    <NavLink to="/administrator/addCustomer">Add Customer</NavLink><br />
                </>
            }

            {token &&
                authStore.getState().clientType.toString() == "COMPANY" && <>
                    <NavLink to="/company">Home</NavLink>
                    <NavLink to="/company/coupons">My Coupons</NavLink><br />
                    <NavLink to="/company/addCoupon">Add Coupon</NavLink><br />
                    <NavLink to="/company/details">My details</NavLink><br />
                </>}

            {token &&
                authStore.getState().clientType.toString() == "CUSTOMER" && <>
                    <NavLink to="/customer">Home</NavLink>
                    <NavLink to="/customer/coupons">my coupons</NavLink>
                    <NavLink to="/customer/details">my details</NavLink>
                </>}

        </div >
    );
}

export default Menu;
