package com.example.Project3.controllers;

import com.example.Project3.beans.Company;
import com.example.Project3.beans.Customer;
import com.example.Project3.beans.TheSession;
import com.example.Project3.exceptions.EmailAlreadyExistsException;
import com.example.Project3.exceptions.IdDoesNotExistException;
import com.example.Project3.exceptions.NameOrEmailAlreadyExistsException;
import com.example.Project3.exceptions.UnauthorizedException;
import com.example.Project3.services.AdminBL;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

/**
 * AdminController class is the class that used to expose the end points of the server side of an Admin to the client side,
 * using methods that connects to the AdminBL.
 */
@RestController
@RequestMapping("admin")
public class AdminController {

    private HttpServletRequest request;

    private HashMap<String, TheSession> sessions;


    public AdminController(HttpServletRequest request, HashMap<String, TheSession> sessions) {
        this.request = request;
        this.sessions = sessions;
    }

    /**
     * This method is to get the object of the BL layer to use in the methods in the controller.
     * It checks if there is a valid token and if so getting and returning the fitting ClientBL using the token.
     *
     * @return (AdminBL) ClientBL
     * @throws UnauthorizedException
     */
    public AdminBL getService() throws UnauthorizedException {
        String token = request.getHeader("authorization").replace("Bearer ", "");
        if (sessions.containsKey(token)) {
            return (AdminBL) sessions.get(token).getClientBL();
        }
        throw new UnauthorizedException();
    }

    /**
     * This method is to expose the end point of adding a company.
     *
     * @param company is the company object to add.
     * @return ResponseEntity with the company after adding it if the process succeeded.
     * @throws UnauthorizedException
     * @throws NameOrEmailAlreadyExistsException
     */
    @PostMapping("/addCompany")
    public ResponseEntity<?> addCompany(@RequestBody Company company) throws UnauthorizedException, NameOrEmailAlreadyExistsException {
        getService().addCompany(company);
        return ResponseEntity.status(HttpStatus.CREATED).body(company);
    }

    /**
     * This method is to expose the end point of updating a company.
     *
     * @param company is the company to update
     * @return ResponseEntity with a String if the process succeeded.
     * @throws UnauthorizedException
     * @throws EmailAlreadyExistsException
     */
    @PutMapping("/updateCompany")
    public ResponseEntity<?> updateCompany(@RequestBody Company company) throws UnauthorizedException, EmailAlreadyExistsException {
        getService().updateCompany(company);
        return ResponseEntity.ok("Updated successfully");
    }

    /**
     * This method is to expose the end point of deleting a company.
     *
     * @param companyId is the id of the company to delete.
     * @return ResponseEntity with a String if the process succeeded.
     * @throws UnauthorizedException
     * @throws IdDoesNotExistException
     */
    @DeleteMapping("/deleteCompany/{companyId}")
    public ResponseEntity<?> deleteCompany(@PathVariable int companyId) throws UnauthorizedException, IdDoesNotExistException {
        getService().deleteCompany(companyId);
        return ResponseEntity.ok("Deleted successfully");
    }

    /**
     * This method is to expose the end point of getting one company.
     *
     * @param companyId is the id of the desirable company.
     * @return ResponseEntity with the desirable company if the process succeeded.
     * @throws UnauthorizedException
     * @throws IdDoesNotExistException
     */
    @GetMapping("/getOneComp/{companyId}")
    public ResponseEntity<?> getOneCompany(@PathVariable int companyId) throws UnauthorizedException, IdDoesNotExistException {
        return ResponseEntity.ok(getService().getOneCompany(companyId));
    }

    /**
     * This method is to expose the end point of getting all companies.
     *
     * @return ResponseEntity with all companies if the process succeeded.
     * @throws UnauthorizedException
     */
    @GetMapping("/getAllComp")
    public ResponseEntity<?> getAllCompanies() throws UnauthorizedException {
        return ResponseEntity.ok(getService().getAllCompanies());
    }

    /**
     * This method is to expose the end point of adding a customer.
     *
     * @param customer is the customer to add.
     * @return ResponseEntity with the customer after adding it if the process succeeded.
     * @throws UnauthorizedException
     * @throws EmailAlreadyExistsException
     */
    @PostMapping("/addCustomer")
    public ResponseEntity<?> addCustomer(@RequestBody Customer customer) throws UnauthorizedException, EmailAlreadyExistsException {
        getService().addCustomer(customer);
        return ResponseEntity.ok(customer);
    }

    /**
     * This method is to expose the end point of updating a customer.
     *
     * @param customer is the customer to update.
     * @return ResponseEntity with a String if the process succeeded.
     * @throws UnauthorizedException
     * @throws EmailAlreadyExistsException
     */
    @PutMapping("/updateCustomer")
    public ResponseEntity<?> updateCustomer(@RequestBody Customer customer) throws UnauthorizedException, EmailAlreadyExistsException {
        getService().updateCustomer(customer);
        return ResponseEntity.ok("Updated successfully");
    }

    /**
     * This method is to expose the end point of deleting a customer.
     *
     * @param customerId is the id of the customer to delete
     * @return ResponseEntity with a String if the process succeeded.
     * @throws UnauthorizedException
     * @throws IdDoesNotExistException
     */
    @DeleteMapping("/deleteCustomer/{customerId}")
    public ResponseEntity<?> deleteCustomer(@PathVariable int customerId) throws UnauthorizedException, IdDoesNotExistException {
        getService().deleteCustomer(customerId);
        return ResponseEntity.ok("Deleted successfully");
    }

    /**
     * This method is to expose the end point of getting one customer.
     *
     * @param customerId is the id of the desirable customer.
     * @return ResponseEntity with the desirable customer if the process succeeded.
     * @throws UnauthorizedException
     * @throws IdDoesNotExistException
     */
    @GetMapping("/getOneCus/{customerId}")
    public ResponseEntity<?> getOneCustomer(@PathVariable int customerId) throws UnauthorizedException, IdDoesNotExistException {
        return ResponseEntity.ok(getService().getOneCustomer(customerId));
    }

    /**
     * This method is to expose the end point of getting all customers.
     *
     * @return ResponseEntity with all customers if the process succeeded.
     * @throws UnauthorizedException
     */
    @GetMapping("/getAllCus")
    public ResponseEntity<?> getAllCustomers() throws UnauthorizedException {
        return ResponseEntity.ok(getService().getAllCustomers());
    }
}
