import axios from "axios";
import Company from "../Models/Company";
import Coupon from "../Models/Coupon";
import Category from "../Models/Category";
import { addCoupon, companyStore, deleteCoupon, fetchCoupon, fetchTheCompany, updateCoupon } from "../Store/CompanyState";

/**
 * CompanyService class is the service class for company with the actions a company can implements in the program.
 * It give's access to the server side by connecting to the controllers and the end points
 * in the server with the actions of a company.
 */
class CompanyService {

    /**
     * This method is to add a coupon by connecting to the relevant end point in the server.
     * It sending a request using axios to the server with a Coupon object and if the proccess succeed
     * than getting back a coupon object.
     * If procces succeed than the coupon also being added to the company store in the client side.
     * @param coupon is the coupon to send to the server to add.
     * @returns the response.data from the server, a coupon object if succeed.
     */
    public async addCoupon(coupon: Coupon) {
        const respone = (await axios.post<Coupon>("http://localhost:8080/company/addCoupon/", coupon)).data;
        companyStore.dispatch(addCoupon(respone));
        return respone;
    }

    /**
     * This method is to update a coupon by connecting to the relevant end point in the server.
     * It sending a request using axios to the server with a Coupon object.
     * If procces succeed than also updating in the company store.
     * @param coupon is the coupon to send to the server to update.
     * @returns response.data
     */
    public async updateCoupon(coupon: Coupon) {
        const respone = (await axios.put<string>("http://localhost:8080/company/updateCoupon/", coupon)).data;
        companyStore.dispatch(updateCoupon(coupon));
        return respone;
    }

    /**
     * This method is to delete a coupon by connecting to the relevant end point in the server.
     * It sending a request using axios to the server with the id of the coupon to delete.
     * If procces succeed than also updating in the company store.
     * @param id is id to send to the server of the coupon to delete.
     * @returns response.data.
     */
    public async deleteCoupon(id: number) {
        const response = (await axios.delete<string>("http://localhost:8080/company/deleteCoupon/" + id)).data;
        companyStore.dispatch(deleteCoupon(id));
        return response;
    }

    /**
     * This method is to get all coupons of the specific company. It first check if it already in the company store, if so than getting 
     * the list from the store, and if not than connecting to the relevant end point in the server to
     * get the list from the server and then saving it in the store.
     * @returns list of Coupon if succeed.
     */
    public async getCompanyCoupons() {
        if (companyStore.getState().coupons.length == 0) {
            const coupons = (await axios.get<Coupon[]>("http://localhost:8080/company/getCoupons")).data;
            companyStore.dispatch(fetchCoupon(coupons));
            return coupons;
        }
        return companyStore.getState().coupons;
    }

    /**
     * This method is to get all coupons of the specific company by a specific category.
     * It uses the getCompanyCoupons() method to get the coupons either from the store or the server
     * and then filter the list.       
     * @param category is the category to filter by.
     * @returns list of coupons or empty list.
     */
    public async getCompanyCouponsByCategory(category: Category) {
        const coupons = this.getCompanyCoupons();
        return (await coupons).filter(c => c.category == category);
    }

    /**
     * This method is to get all coupons of the specific company by max price.
     * It uses the getCompanyCoupons() method to get the coupons either from the store or the server
     * and then filter the list.
     * @param maxPrice is the price to filter by.
     * @returns list of coupons or empty list.
     */
    public async getCompanyCouponsMaxPrice(maxPrice: number) {
        const coupons = this.getCompanyCoupons();
        return (await coupons).filter(c => c.price <= maxPrice);
    }

    /**
     * This method is to get the company details. It first ckecks if can find it in the store,
     * if so than getting it from the store, and if not than connecting to the relevant end point in the server
     * to get it and then saving it in the store.
     * @returns Company object if succeed.
     */
    public async getCompanyDetails() {
        const company = companyStore.getState().company;
        if (company == null || company == undefined) {
            const response = (await axios.get<Company>("http://localhost:8080/company/getDetails")).data;
            companyStore.dispatch(fetchTheCompany(response));
            return response;
        }
        return company;
    }
}

const companyService = new CompanyService();
export default companyService;


