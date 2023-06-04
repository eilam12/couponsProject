import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./UpdateCustomer.css";
import { useForm } from "react-hook-form";
import Customer from "../../../Models/Customer";
import notificationsService from "../../../Services/NotificationsServise";
import { useEffect, useState } from "react";
import adminService from "../../../Services/AdminService";
import { authStore } from "../../../Store/AuthState";

// A component for updating a customer. Only An Admin would have access to it.
function UpdateCustomer(): JSX.Element {

    const { register, handleSubmit, formState, setValue } = useForm<Customer>();
    const navigate = useNavigate();
    const id: number = +useParams().customerId;
    const [getCustomer, setCustomer] = useState<Customer>();

    useEffect(() => {
        if (!authStore.getState().token) {
            notificationsService.error("unauthorize, please log in");
            navigate("/home");
            return;
        }

        // getting the specific customer to display it's current details when updating, using setValue from useForm.
        adminService.getOneCustomer(id)
            .then(customer => {
                setValue("firstName", customer.firstName);
                setValue("lastName", customer.lastName);
                setValue("email", customer.email);
                setValue("password", customer.password);
                setCustomer(customer);
            })
            .catch(err => notificationsService.error(err));
    }, []);

    /**
     * the function that using the service in order to send the customer to update.
     * @param customer the customer object to update that the useForm help us build from the input of the end user.
     */
    function sendCustomer(customer: Customer) {
        customer.coupons = getCustomer.coupons;
        customer.id = id;
        adminService.updateCustomer(customer)
            .then(() => {
                notificationsService.success("Customer Updated");
                navigate("/administrator/customer/" + id);
            })
            .catch(err => notificationsService.error(err));
    }


    return (
        <div className="UpdateCustomer">

            <NavLink to={"/administrator/customer/" + id} ><button>back</button></NavLink><br />
            <h3>Update cutomer:</h3>

            {/* only relevant details that are allowed to update would be in the form */}
            <form className="box" onSubmit={handleSubmit(sendCustomer)}>

                <input type="text" placeholder="First Name" {...register("firstName", {
                    required: { value: true, message: "You must enter first name" },
                    minLength: { value: 1, message: "must enter at least 1 characters" }
                })} /><br />
                <span>{formState.errors?.firstName?.message}</span><br />

                <input type="text" placeholder="Last Name" {...register("lastName", {
                    required: { value: true, message: "You must enter last name" },
                    minLength: { value: 1, message: "must enter at least 1 characters" }
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

                <input type="submit" value="edit" />
            </form>

        </div>
    );
}

export default UpdateCustomer;
