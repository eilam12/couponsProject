import { NavLink } from "react-router-dom";
import Company from "../../../Models/Company";
import CouponCard from "../../CouponArea/CouponCard/CouponCard";
import "./CompanyCard.css";


interface CompaniesProps {
    company: Company;
}

function CompanyCard(props: CompaniesProps): JSX.Element {
    return (

        <div className="CompanyCard">
            <NavLink to={"/administrator/companies/" + props.company.id}>
                {props.company.name}
            </NavLink>
            <p>{props.company.email}</p>
        </div>
    );
}

export default CompanyCard;
