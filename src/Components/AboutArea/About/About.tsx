import { NavLink } from "react-router-dom";
import "./About.css";
import { authStore } from "../../../Store/AuthState";

function About(): JSX.Element {
    return (
        <div className="About">

            {!authStore.getState().token &&
                <div><NavLink to="/home"><button>home</button></NavLink></div>
            }

            <h1>hello</h1>
            <p>Welcome to our site!
                We are very happy that you chose to visit our website, we wish you the best and hoping that you
                will find coupons that you would like and could help you with buying things.
            </p>
        </div>
    );
}

export default About;
