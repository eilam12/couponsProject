import axios from "axios";
import Company from "../Models/Company";
import Customer from "../Models/Customer";
import { addCompany, addCustomer, adminStore, deleteCompany, deleteCustomer, fetchCompany, fetchCustomer, updateCompany, updateCustomer } from "../Store/AdminState";

/**
 * AdminService class is the service class for admin with the actions an admin can implements in the program.
 * It give's access to the server side by connecting to the controllers and the end points
 * in the server with the actions of an admin. 
 */
class AdminService {

    /**
     * This method is to add a company by connecting to the relevant end point in the server.
     * It sending a request using axios to the server with a Company object and if the proccess succeed
     * than getting back a company object.
     * If procces succeed than the company also being added to the admin store in the client side.
     * @param company is the company to send to the server to add.
     * @returns the response.data from the server, a company object if succeed.  
     */
    public async addCompany(company: Company) {
        const response = (await axios.post<Company>("http://localhost:8080/admin/addCompany/", company)).data;
        adminStore.dispatch(addCompany(response));
        return response;
    }

    /**
     * This method is to update a company by connecting to the relevant end point in the server.
     * It sending a request using axios to the server with a Company object.
     * If procces succeed than also updating in the admin store.
     * @param company is the company to send to the server to update.
     * @returns response.data 
     */
    public async updateCompany(company: Company) {
        const respone = (await axios.put<string>("http://localhost:8080/admin/updateCompany/", company)).data;
        adminStore.dispatch(updateCompany(company));
        return respone;
    }

    /**
     * This method is to delete a company by connecting to the relevant end point in the server.
     * It sending a request using axios to the server with the id of the company to delete.
     * If procces succeed than also updating in the admin store.
     * @param id is id to send to the server of the company to delete.
     * @returns response.data.
     */
    public async deleteCompany(id: number) {
        const response = (await axios.delete<string>("http://localhost:8080/admin/deleteCompany/" + id)).data;
        adminStore.dispatch(deleteCompany(id));
        return response;
    }

    /**
     * This method is to get one company. It first check if can find it in the admin store, if so than getting 
     * the company from the store, and if not than connecting to the relevant end point in the server to try to
     * get the company from the server.
     * @param id is the id of the company to get.
     * @returns a company object or response.data.
     */
    public async getOneCompany(id: number) {
        const company = adminStore.getState().companies.find(c => c.id == id);
        if (company == undefined)
            return (await axios.get<Company>("http://localhost:8080/admin/getOneComp/" + id)).data;
        else
            return company;
    }

    /**
     * This method is to get all companies. It first check if it already in the admin store, if so than getting 
     * the list from the store, and if not than connecting to the relevant end point in the server to
     * get the list from the server and then saving it in the store.
     * @returns list of Company if succeed.
     */
    public async getAllCompanies() {
        if (adminStore.getState().companies.length == 0) {
            const companies = (await axios.get<Company[]>("http://localhost:8080/admin/getAllComp")).data;
            adminStore.dispatch(fetchCompany(companies));
            return companies;
        }
        return adminStore.getState().companies;
    }

    /**
     * This method is to add a customer by connecting to the relevant end point in the server.
     * It sending a request using axios to the server with a Customer object and if the proccess succeed
     * than getting back a customer object.
     * If procces succeed than the customer also being added to the admin store in the client side.
     * @param customer is the customer to send to the server to add.
     * @returns the response.data from the server, a customer object if succeed.
     */
    public async addCustomer(customer: Customer) {
        const response = (await axios.post<Customer>("http://localhost:8080/admin/addCustomer/", customer)).data;
        adminStore.dispatch(addCustomer(response));
        return response;
    }

    /**
     * This method is to update a customer by connecting to the relevant end point in the server.
     * It sending a request using axios to the server with a Customer object.
     * If procces succeed than also updating in the admin store.
     * @param customer is the customer to send to the server to update.
     * @returns response.data
     */
    public async updateCustomer(customer: Customer) {
        const response = (await axios.put<string>("http://localhost:8080/admin/updateCustomer/", customer)).data;
        adminStore.dispatch(updateCustomer(customer));
        return response;
    }

    /**
     * This method is to delete a customer by connecting to the relevant end point in the server.
     * It sending a request using axios to the server with the id of the customer to delete.
     * If procces succeed than also updating in the admin store.
     * @param id is id to send to the server of the customer to delete.
     * @returns response.data.
     */
    public async deleteCustomer(id: number) {
        const response = (await axios.delete<string>("http://localhost:8080/admin/deleteCustomer/" + id)).data;
        adminStore.dispatch(deleteCustomer(id));
        return response;
    }

    /**
     * This method is to get one customer. It first check if can find it in the admin store, if so than getting 
     * the customer from the store, and if not than connecting to the relevant end point in the server to try to
     * get the customer from the server.
     * @param id is the id of the customer to get.
     * @returns a customer object or response.data.
     */
    public async getOneCustomer(id: number) {
        const customer = adminStore.getState().customers.find(c => c.id == id);
        if (customer == undefined) {
            return (await axios.get<Customer>("http://localhost:8080/admin/getOneCus/" + id)).data;
        }
        else
            return customer;
    }

    /**
     * This method is to get all customers. It first check if it already in the admin store, if so than getting 
     * the list from the store, and if not than connecting to the relevant end point in the server to
     * get the list from the server and then saving it in the store.
     * @returns list of Customer if succeed.
     */
    public async getAllCustomers() {
        if (adminStore.getState().customers.length == 0) {
            const customers = (await axios.get<Customer[]>("http://localhost:8080/admin/getAllCus")).data;
            adminStore.dispatch(fetchCustomer(customers));
            return customers;
        }
        return adminStore.getState().customers;
    }
}
const adminService = new AdminService();
export default adminService;