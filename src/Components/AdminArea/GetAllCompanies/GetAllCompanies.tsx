import { useEffect, useRef, useState } from "react";
import "./GetAllCompanies.css";
import Company from "../../../Models/Company";
import notificationsService from "../../../Services/NotificationsServise";
import { NavLink, useNavigate } from "react-router-dom";
import CompanyCard from "../../CompanyArea/CompanyCard/CompanyCard";
import adminService from "../../../Services/AdminService";
import { authStore } from "../../../Store/AuthState";

// A component to get and see all companies. Only An Admin would have access to it.
function GetAllCompanies(): JSX.Element {

    const [getCompanies, setCompanies] = useState<Company[]>([]);
    const navigate = useNavigate();
    const inputRef = useRef(null);

    useEffect(() => {
        if (!authStore.getState().token) {
            notificationsService.error("unauthorize, please log in");
            navigate("/home");
            return;
        }

        // to get all the companies using the adminService
        adminService.getAllCompanies()
            .then(companies => setCompanies(companies))
            .catch(err => notificationsService.error(err));
    }, []);

    // a function to get one company searching by it's name. if found than navigate to the component with that 
    // specific company details. if not found than giving a massage that not found. 
    function getOneCompany() {
        if (inputRef.current.value != "") {
            // setCompanies(getCompanies.filter(c => c.name.startsWith(inputRef.current.value)));
            const company = getCompanies.find(c => c.name == inputRef.current.value);
            if (company != undefined)
                navigate("/administrator/companies/" + company.id);
            else
                notificationsService.error("sory, can't find the company");
        }
    }


    return (
        <div className="GetAllCompanies">

            <NavLink to={"/administrator/addCompany"}><button>Add Company</button></NavLink><br />

            <input type="text" placeholder="name" ref={inputRef} />
            <button onClick={getOneCompany}>company by name</button>

            <div>{getCompanies?.map(c => <CompanyCard key={c.id} company={c} />)}</div>
        </div>
    );
}

export default GetAllCompanies;
