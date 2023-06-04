import axios from "axios";
import Coupon from "../Models/Coupon";
import Category from "../Models/Category";
import { addCoupon, customerStore, deleteCoupon, fetchCoupon, fetchTheCustomer } from "../Store/CustomerState";
import Customer from "../Models/Customer";

/**
 * CustomerService class is the service class for customer with the actions a customer can implements in the program.
 * It give's access to the server side by connecting to the controllers and the end points
 * in the server with the actions of a customer.
 */
class CustomerService {

    /**
     * This method is to purchase a coupon by connecting to the relevant end point in the server.
     * It sending a request using axios to the server with the coupon to purchase.
     * If procces succeed than the coupon also being added to the customer store in the client side
     * @param coupon is the coupon to purchase.
     * @returns response.data.
     */
    public async purchaseCoupon(coupon: Coupon) {
        const respone = (await axios.post<string>("http://localhost:8080/customer/purchaseCoupon/", coupon)).data;
        if (respone == "Coupon purchased")
            customerStore.dispatch(addCoupon(coupon));
        return respone;
    }

    /**
     * This method is to get all coupons of the specific customer that he purchased.
     * It first check if it already in the customer store, if so than getting 
     * the list from the store, and if not than connecting to the relevant end point in the server to
     * get the list from the server and then saving it in the store.
     * @returns list of Coupon if succeed.
     */
    public async getCustomerCoupons() {
        if (customerStore.getState().coupons.length == 0) {
            const coupons = (await axios.get<Coupon[]>("http://localhost:8080/customer/getCustomerCoupons")).data;
            customerStore.dispatch(fetchCoupon(coupons));
            return coupons;
        }
        return customerStore.getState().coupons;
    }

    /**
     * This method is to get all coupons of the specific customer by a specific category that he purchased.
     * It uses the getCustomerCoupons() method to get the coupons either from the store or the server
     * and then filter the list.       
     * @param category is the category to filter by.
     * @returns list of coupons or empty list.
     */
    public async getCustomerCouponsByCategory(category: Category) {
        const coupons = this.getCustomerCoupons();
        return (await coupons).filter(c => c.category == category);
    }

    /**
     * This method is to get all coupons of the specific customer by max price that he purchased.
     * It uses the getCustomerCoupons() method to get the coupons either from the store or the server
     * and then filter the list.
     * @param maxPrice is the price to filter by.
     * @returns list of coupons or empty list.
     */
    public async getCustomerCouponsByMaxPrice(maxPrice: number) {
        const coupons = this.getCustomerCoupons();
        return (await coupons).filter(c => c.price <= maxPrice);
    }

    /**
     * This method is to delete a purchase of a specific customer
     * by connecting to the relevant end point in the server.
     * It sending a request using axios to the server with the id of the coupon to delete the purchase of.
     * If procces succeed than also updating in the customer store.
     * @param couponId is the id of the coupon to delete the purchase of.
     * @returns rsponse.data
     */
    public async deletePurchase(couponId: number) {
        const response = (await axios.delete<string>("http://localhost:8080/customer/deletePurchase/" + couponId)).data;
        customerStore.dispatch(deleteCoupon(couponId));
        return response;
    }

    /**
     * This method is to get all the coupons by connecting to the relevant end point in the server.
     * @returns list of Coupon if succeed.
     */
    public async getAllCoupons() {
        return (await axios.get<Coupon[]>("http://localhost:8080/customer/getAllCoupons")).data;
    }

    /**
     * This method is to get the customer details. It first ckecks if can find it in the store,
     * if so than getting it from the store, and if not than connecting to the relevant end point in the server
     * to get it and then saving it in the store.
     * @returns Customer object if succeed.
     */
    public async getCustomerDetails() {
        const customer = customerStore.getState().customer;
        if (customer == null || customer == undefined) {
            const response = (await axios.get<Customer>("http://localhost:8080/customer/getDetails")).data;
            customerStore.dispatch(fetchTheCustomer(response));
            return response;
        }
        return customer;
    }
}

const customerService = new CustomerService();
export default customerService;