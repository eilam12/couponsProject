import { useEffect, useState } from "react";
import Company from "../../../Models/Company";
import "./ThisCompanyDetails.css";
import { useNavigate } from "react-router-dom";
import companyService from "../../../Services/CompanyService";
import notificationsService from "../../../Services/NotificationsServise";
import { NavLink } from "react-router-dom";
import { authStore } from "../../../Store/AuthState";

// A component to for a company to see its own details
function ThisCompanyDetails(): JSX.Element {

    const [getCompany, setCompay] = useState<Company>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authStore.getState().token) {
            notificationsService.error("unauthorize, please log in");
            navigate("/home");
            return;
        }

        // to get the specific company details using the companyService
        companyService.getCompanyDetails()
            .then(c => setCompay(c))
            .catch(err => notificationsService.error(err));
    }, [])



    return (
        <div className="ThisCompanyDetails">

            <NavLink to={"/company"}><button>back</button></NavLink>
            <div>
                <h2>Name: {getCompany?.name}</h2>
                <h4>Email: {getCompany?.email}</h4>
            </div>
        </div>
    );
}

export default ThisCompanyDetails;
