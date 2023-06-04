import { useEffect, useRef, useState } from "react";
import "./GetAllCustomers.css";
import Customer from "../../../Models/Customer";
import notificationsService from "../../../Services/NotificationsServise";
import CustomerCard from "../../CustomerArea/CustomerCard/CustomerCard";
import { NavLink, useNavigate } from "react-router-dom";
import adminService from "../../../Services/AdminService";
import { authStore } from "../../../Store/AuthState";

// A component to get and see all customers. Only An Admin would have access to it.
function GetAllCustomers(): JSX.Element {

    const [getCustomers, setCustomers] = useState<Customer[]>([]);
    const navigate = useNavigate();
    const inputRef = useRef(null);

    useEffect(() => {
        if (!authStore.getState().token) {
            notificationsService.error("unauthorize, please log in");
            navigate("/home");
            return;
        }

        // to get all the customers using the adminService
        adminService.getAllCustomers()
            .then(customers => setCustomers(customers))
            .catch(err => notificationsService.error(err));
    }, []);

    // a function to get one customer searching by it's name. if found than navigate to the component with that 
    // specific customer details. if not found than giving a massage that not found.
    function getOneCustomer() {
        if (inputRef.current.value != "") {
            const customer = getCustomers.find(c => c.firstName == inputRef.current.value);
            if (customer != undefined)
                navigate("/administrator/customer/" + customer.id);
            else
                notificationsService.error("sory, can't find the customer");
        }
    }

    return (
        <div className="GetAllCustomers">

            <NavLink to="/administrator/addCustomer"><button>Add customer</button></NavLink><br />

            <input type="text" placeholder="name" ref={inputRef} />
            <button onClick={getOneCustomer}>customer by first name</button>

            <div>{getCustomers.map(c => <CustomerCard key={c.id} customer={c} />)}</div>

        </div>
    );
}

export default GetAllCustomers;
