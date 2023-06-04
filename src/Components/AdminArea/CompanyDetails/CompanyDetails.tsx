import { useEffect, useState } from "react";
import Company from "../../../Models/Company";
import "./CompanyDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import notificationsService from "../../../Services/NotificationsServise";
import adminService from "../../../Services/AdminService";
import { authStore } from "../../../Store/AuthState";

// A component to see a company details with functions the system have about company, only an admin is authorized for.
function CompanyDetails(): JSX.Element {

    const [getCompany, setCompany] = useState<Company>();
    const id: number = +useParams().companyId;
    const navigate = useNavigate();

    useEffect(() => {
        if (!authStore.getState().token) {
            notificationsService.error("unauthorize, please log in");
            navigate("/home");
            return;
        }
        // to get the specific company details using the adminService
        adminService.getOneCompany(id)
            .then(company => setCompany(company))
            .catch(err => notificationsService.error(err));
    }, [])

    // a function to delete the company using the adminService.
    // After successfully delete will navigate to relevant component (the component of all companies)   
    function deleteMe() {
        adminService.deleteCompany(id)
            .then(msg => {
                notificationsService.success(msg);
                navigate("/administrator/companies");
            })
            .catch(err => notificationsService.error(err));
    }

    // a function to navigate to the component of updating the company if relevant button was pressed
    function updateCompany() {
        navigate("/administrator/companies/edit/" + id);
    }
    // a function to navigate to the component of all companies if relevant button was pressed
    function back() {
        navigate("/administrator/companies");
    }



    return (
        <div className="CompanyDetails">
            <button onClick={back}>back</button>

            {!getCompany && <p>Sorry, cannot find the company...</p>}

            {getCompany &&
                <div>
                    <h2>Name: {getCompany?.name}</h2>
                    <h4>Email: {getCompany?.email}</h4>
                    <button onClick={updateCompany}>Edit</button><br /><br />
                    <button onClick={deleteMe}>delete</button><br />
                </div>}

        </div >
    );
}

export default CompanyDetails;
