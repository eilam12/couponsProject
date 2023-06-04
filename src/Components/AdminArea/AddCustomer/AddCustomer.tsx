import { useForm } from "react-hook-form";
import "./AddCustomer.css";
import { useNavigate } from "react-router-dom";
import Customer from "../../../Models/Customer";
import notificationsService from "../../../Services/NotificationsServise";
import adminService from "../../../Services/AdminService";
import { useEffect } from "react";
import { authStore } from "../../../Store/AuthState";

// A component for adding a customer. Only An Admin would have access to it.
function AddCustomer(): JSX.Element {

    const navigate = useNavigate();
    useEffect(() => {
        if (!authStore.getState().token) {
            notificationsService.error("unauthorize, please log in");
            navigate("/home");
            return;
        }
    }, []);


    const { register, handleSubmit, formState } = useForm<Customer>();
    /**
     * the function that using the service in order to send the customer
     * @param customer the customer object to add that the useForm help us build from the input of the end user.
     */
    function sendCustomer(customer: Customer) {
        customer.coupons = []; // because when adding a customer the admin not supposed to add also its purchases
        adminService.addCustomer(customer)
            .then(() => {
                notificationsService.success("Customer Added");
                navigate("/administrator/customers");
            })
            .catch(err => notificationsService.error(err));
    }

    return (
        <div className="AddCustomer">

            <h3>Add customer:</h3>

            {/* the form with the inputs for the end user to fill the customer details to add using useForm */}
            <form className="box" onSubmit={handleSubmit(sendCustomer)}>
                <input type="text" placeholder="First Name" {...register("firstName", {
                    required: { value: true, message: "You must enter first name" },
                    minLength: { value: 1, message: "must enter at least 1 character" }
                })} /><br />
                <span>{formState.errors?.firstName?.message}</span><br />

                <input type="text" placeholder="Last Name" {...register("lastName", {
                    required: { value: true, message: "You must enter last name" },
                    minLength: { value: 1, message: "must enter at least 1 character" }
                })} /><br />
                <span>{formState.errors?.lastName?.message}</span><br />

                <input type="email" placeholder="Email" {...register("email", {
                    required: { value: true, message: "You must enter email" },
                    minLength: { value: 3, message: "must enter at least 3 characters" }
                })} /><br />
                <span>{formState.errors?.email?.message}</span><br />

                <input type="password" placeholder="Password" {...register("password", {
                    required: { value: true, message: "You must enter password" },
                    minLength: { value: 6, message: "must enter at least 6 characters" }
                })} /><br />
                <span>{formState.errors?.password?.message}</span><br />

                <input type="submit" value="Add" />
            </form>

        </div>
    );
}

export default AddCustomer;
