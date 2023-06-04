import { useForm } from "react-hook-form";
import Company from "../../../Models/Company";
import "./AddCompany.css";
import notificationsService from "../../../Services/NotificationsServise";
import { useNavigate } from "react-router-dom";
import adminService from "../../../Services/AdminService";
import { useEffect } from "react";
import { authStore } from "../../../Store/AuthState";

// A component for adding a company. Only An Admin would have access to it.

function AddCompany(): JSX.Element {

    const navigate = useNavigate();
    useEffect(() => {
        if (!authStore.getState().token) {
            notificationsService.error("unauthorize, please log in");
            navigate("/home");
            return;
        }

        // adminService.getAllCompanies()
        //     .then().catch();
    }, []);


    const { register, handleSubmit, formState } = useForm<Company>();

    /**
     * the function that using the service in order to send the company
     * @param company the company object to add that the useForm help us build from the input of the end user.
     */
    function sendCompany(company: Company) {
        company.coupons = []; // because when adding a company the user not supposed to add also its coupons
        adminService.addCompany(company)
            .then(() => {
                notificationsService.success("Company Added");
                navigate("/administrator/companies");
            })
            .catch(err => notificationsService.error(err));
    }

    return (
        <div className="AddCompany">

            <h3>Add company:</h3>
            {/* the form with the inputs for the end user to fill the company details to add using useForm */}
            <form className="box" onSubmit={handleSubmit(sendCompany)}>

                <input type="text" placeholder="name" {...register("name", {
                    required: { value: true, message: "You must enter name" },
                    minLength: { value: 3, message: "must enter at least 3 characters" }
                })} /><br />
                <span>{formState.errors?.name?.message}</span><br />

                <input type="email" placeholder="email" {...register("email", {
                    required: { value: true, message: "You must enter email" },
                    minLength: { value: 3, message: "must enter at least 3 characters" }
                })} /><br />
                <span>{formState.errors?.email?.message}</span><br />

                <input type="password" placeholder="password" {...register("password", {
                    required: { value: true, message: "You must enter password" },
                    minLength: { value: 6, message: "must enter at least 6 characters" }
                })} /><br />
                <span>{formState.errors?.password?.message}</span><br />

                <input type="submit" value="Add" />
            </form>

        </div>
    );
}

export default AddCompany;
