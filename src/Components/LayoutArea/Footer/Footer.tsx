import { NavLink } from "react-router-dom";
import "./Footer.css";

function Footer(): JSX.Element {
    return (
        <div className="Footer">
            <p>All rights reserved to EilamTech &copy; LTD.</p>
            <NavLink id="about" to="/about">About us</NavLink>
        </div>
    );
}

export default Footer;
