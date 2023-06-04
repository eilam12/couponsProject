import { useForm } from "react-hook-form";
import Company from "../../../Models/Company";
import "./UpdateCompany.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import adminService from "../../../Services/AdminService";
import notificationsService from "../../../Services/NotificationsServise";
import { authStore } from "../../../Store/AuthState";

// A component for updating a company. Only An Admin would have access to it.
function UpdateCompany(): JSX.Element {

    const { register, handleSubmit, formState, setValue } = useForm<Company>();
    const navigate = useNavigate();
    const id: number = +useParams().companyId;
    const [getCompany, setCompany] = useState<Company>();

    useEffect(() => {
        if (!authStore.getState().token) {
            notificationsService.error("unauthorize, please log in");
            navigate("/home");
            return;
        }

        // getting the specific company to display it's current details when updating, using setValue from useForm. 
        adminService.getOneCompany(id)
            .then(company => {
                setValue("email", company.email);
                setValue("password", company.password);
                setCompany(company);
            })
            .catch(err => notificationsService.error(err));
    }, []);

    /**
     * the function that using the service in order to send the company to update.
     * @param company the company object to update that the useForm help us build from the input of the end user.
     */
    function sendCompany(company: Company) {
        company.id = id;
        company.name = getCompany.name; // because not allowed to update name and otherwise name will be defaulted to nothing 
        company.coupons = getCompany.coupons; // so coupons wont be defaulted as well 

        adminService.updateCompany(company)
            .then(msg => {
                notificationsService.success(msg);
                navigate("/administrator/companies/" + id);
            })
            .catch(err => notificationsService.error(err));
    }

    return (
        <div className="UpdateCompany">

            <NavLink to={"/administrator/companies/" + id} ><button>back</button></NavLink><br />
            <h3>Update company:</h3>

            {/* only relevant details that are allowed to update would be in the form */}
            <form className="box" onSubmit={handleSubmit(sendCompany)}>

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

                <input type="submit" value="edit" />
            </form>

        </div>
    );
}

export default UpdateCompany;
