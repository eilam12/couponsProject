import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import GetAllCompanies from "../../AdminArea/GetAllCompanies/GetAllCompanies";
import AdminPage from "../../AdminArea/AdminPage/AdminPage";
import GetAllCustomers from "../../AdminArea/GetAllCustomers/GetAllCustomers";
import AddCompany from "../../AdminArea/AddCompany/AddCompany";
import AddCustomer from "../../AdminArea/AddCustomer/AddCustomer";
import CompanyPage from "../../CompanyArea/CompanyPage/CompanyPage";
import CompanyCoupons from "../../CompanyArea/CompanyCoupons/CompanyCoupons";
import AddCoupon from "../../CompanyArea/AddCoupon/AddCoupon";
import UpdateCustomer from "../../AdminArea/UpdateCustomer/UpdateCustomer";
import CompanyDetails from "../../AdminArea/CompanyDetails/CompanyDetails";
import UpdateCompany from "../../AdminArea/UpdateCompany/UpdateCompany";
import CustomerDetails from "../../AdminArea/CustomerDetails/CustomerDetails";
import CouponDetails from "../../CouponArea/CouponDetails/CouponDetails";
import UpdateCoupon from "../../CompanyArea/UpdateCoupon/UpdateCoupon";
import ThisCompanyDetails from "../../CompanyArea/ThisCompanyDetails/ThisCompanyDetails";
import CustomerPage from "../../CustomerArea/CustomerPage/CustomerPage";
import CustomerCoupons from "../../CustomerArea/CustomerCoupons/CustomerCoupons";
import CustomerCouponDetails from "../../CustomerArea/CustomerCouponDetails/CustomerCouponDetails";
import CustomerPurchasedCouponDetails from "../../CustomerArea/CustomerPurchasedCouponDetails/CustomerPurchasedCouponDetails";
import About from "../../AboutArea/About/About";
import ThisCustomerDetails from "../../CustomerArea/ThisCustomerDetails/ThisCustomerDetails";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />

                <Route path="/administrator" element={<AdminPage />} />
                
                <Route path="/administrator/companies" element={<GetAllCompanies />} />
                <Route path="/administrator/companies/:companyId" element={<CompanyDetails />} />
                <Route path="/administrator/addCompany" element={<AddCompany />} />
                <Route path="/administrator/companies/edit/:companyId" element={<UpdateCompany />} />

                <Route path="/administrator/customers" element={<GetAllCustomers />} />
                <Route path="/administrator/customer/:customerId" element={<CustomerDetails />} />
                <Route path="/administrator/addCustomer" element={<AddCustomer />} />
                <Route path="/administrator/customers/edit/:customerId" element={<UpdateCustomer />} />

                <Route path="/company" element={<CompanyPage />} />
                <Route path="/company/details" element={<ThisCompanyDetails />} />
                <Route path="/company/coupons" element={<CompanyCoupons />} />
                <Route path="/company/coupons/:couponId" element={<CouponDetails />} />
                <Route path="/company/addCoupon" element={<AddCoupon />} />
                <Route path="/company/coupons/edit/:couponId" element={<UpdateCoupon />} />

                <Route path="/customer" element={<CustomerPage />} />
                <Route path="/customer/details" element={<ThisCustomerDetails />} />
                <Route path="/customer/coupons" element={<CustomerCoupons />} />
                <Route path="/customer/coupons/:couponId" element={<CustomerCouponDetails />} />
                <Route path="/customer/myCoupons/:couponId" element={<CustomerPurchasedCouponDetails />} />


                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="*" element={<PageNotFound />} />

            </Routes >
        </div >
    );
}

export default Routing;
