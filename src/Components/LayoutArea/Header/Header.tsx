import "./Header.css";
import { NavLink } from "react-router-dom";
import Logout from "../../AuthArea/Logout/Logout";
import { authStore } from "../../../Store/AuthState";
import { useEffect, useState } from "react";

function Header(): JSX.Element {

    const [getToken, setToken] = useState<string>();

    useEffect(() => {
        setToken(authStore.getState().token);
        const unsubscribe = authStore.subscribe(() => setToken(authStore.getState().token));

        return () => {
            unsubscribe();
        }
    }, [])

    return (

        <div className="Header">

            {!getToken &&
                <NavLink to={"/home"}>
                    <h2>Coupon world! &trade;</h2>
                </NavLink>}

            {getToken &&
                <NavLink to={"/" + authStore.getState().clientType.toString().toLowerCase()}>
                    <h2>Coupon world! &trade;</h2>
                </NavLink>}

            <Logout />

        </div>

    );
}

export default Header;
