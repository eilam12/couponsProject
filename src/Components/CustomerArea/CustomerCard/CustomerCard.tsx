import { useNavigate, useParams } from "react-router-dom";
import Customer from "../../../Models/Customer";
import "./CustomerCard.css";
import AdminService from "../../../Services/AdminService";
import notificationsService from "../../../Services/NotificationsServise";
import adminServise from "../../../Services/AdminService";
import { NavLink } from "react-router-dom";

interface CustomersProps {
    customer: Customer;
}

function CustomerCard(props: CustomersProps): JSX.Element {

    return (
        <div className="CustomerCard">
            <NavLink to={"/administrator/customer/" + props.customer.id}>
                <p>{props.customer.firstName} {props.customer.lastName}</p>
            </NavLink>
        </div>
    );
}

export default CustomerCard;
