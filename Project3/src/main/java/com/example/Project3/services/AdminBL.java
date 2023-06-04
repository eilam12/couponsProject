package com.example.Project3.services;

import com.example.Project3.beans.Company;
import com.example.Project3.beans.Coupon;
import com.example.Project3.beans.Customer;
import com.example.Project3.exceptions.EmailAlreadyExistsException;
import com.example.Project3.exceptions.IdDoesNotExistException;
import com.example.Project3.exceptions.NameOrEmailAlreadyExistsException;
import com.example.Project3.repositories.CompanyRepository;
import com.example.Project3.repositories.CouponRepository;
import com.example.Project3.repositories.CustomerRepository;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * AdminBL class is a class in the BL layer that has the methods that the Admin can use,
 * and this class implements the business logic of the program in the methods.
 * the class will be used as an object that lets the Admin make actions in the program.
 */
@Service
@Scope("prototype")
public class AdminBL extends ClientBL {

    public AdminBL(CompanyRepository companyRepository, CustomerRepository customerRepository,
                   CouponRepository couponRepository) {
        super(companyRepository, customerRepository, couponRepository);
    }

    /**
     * Checks if the login parameters are correct when trying to log in as an Administrator
     *
     * @param email
     * @param password
     * @return true if the login parameters were valid and were found. otherwise false.
     */
    @Override
    public boolean login(String email, String password) {
        return email.equals("admin@admin.com") && password.equals("admin");
    }

    /**
     * this method is to add a company with the business logic of the program.
     * Checks the name and email of the company to verify if can ba added to the database.
     *
     * @param company is the company to add
     * @throws NameOrEmailAlreadyExistsException
     */
    public void addCompany(Company company) throws NameOrEmailAlreadyExistsException {
        List<Company> companies = getAllCompanies();
        if (companies.stream().anyMatch(c -> c.getName().equals(company.getName())
                || c.getEmail().equals(company.getEmail())))
            throw new NameOrEmailAlreadyExistsException("Name or Email already exists");
        else
            companyRepository.save(company);
    }

    /**
     * this method is to update a company with the business logic of the program.
     * Checks the  email and id(to not include the same company when checking) of the company to verify
     * if can ba updated in the database.
     *
     * @param company is the company to update
     * @throws EmailAlreadyExistsException
     */
    public void updateCompany(Company company) throws EmailAlreadyExistsException {
        List<Company> companies = getAllCompanies();
        if (companies.stream().anyMatch(c -> c.getEmail().equals(company.getEmail()) && c.getId() != company.getId()))
            throw new EmailAlreadyExistsException("Email already exist");
        else
            companyRepository.save(company);
    }

    /**
     * this method is to delete company after using and checking the business logic of the program.
     * to delete a company must need to delete its coupons first, and to delete coupons must need to delete the purchases
     * of those coupons first.
     *
     * @param companyId is the id of the company to delete
     * @throws IdDoesNotExistException If the company was not found
     */
    public void deleteCompany(int companyId) throws IdDoesNotExistException {
        Company company = getOneCompany(companyId); // to check if exists
        for (Coupon c : company.getCoupons()) {
            couponRepository.deletePurchaseByCouponId(c.getId());
        }
        companyRepository.deleteById(companyId);
    }

    /**
     * this method is to get one company and its information from the database for further use.
     *
     * @param companyId is the id of the company to get.
     * @return Company object if found.
     * @throws IdDoesNotExistException if company was not found.
     */
    public Company getOneCompany(int companyId) throws IdDoesNotExistException {
        return companyRepository.findById(companyId).orElseThrow(() ->
                new IdDoesNotExistException("Company was not found"));
    }

    /**
     * this method is to get all companies and its information from the database for further use.
     *
     * @return List of Company or an empty List
     */
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    /**
     * this method is to add a customer with the business logic of the program.
     * Checks the email of the customer to verify if can ba added to the database.
     *
     * @param customer is the customer to add
     * @throws EmailAlreadyExistsException
     */
    public void addCustomer(Customer customer) throws EmailAlreadyExistsException {
        List<Customer> customers = getAllCustomers();
        if (customers.stream().anyMatch(c -> c.getEmail().equals(customer.getEmail())))
            throw new EmailAlreadyExistsException("Email already exist");
        else
            customerRepository.save(customer);
    }

    /**
     * this method is to update a customer with the business logic of the program.
     * Checks the  email and id(to not include the same customer when checking) of the customer to verify
     * if can ba updated in the database.
     *
     * @param customer is the customer to update
     * @throws EmailAlreadyExistsException
     */
    public void updateCustomer(Customer customer) throws EmailAlreadyExistsException {
        List<Customer> customers = getAllCustomers();
        if (customers.stream().anyMatch(c -> c.getEmail().equals(customer.getEmail()) && c.getId() != customer.getId()))
            throw new EmailAlreadyExistsException("Email already exist");
        else
            customerRepository.save(customer);
    }

    /**
     * this method is to delete customer after using and checking the business logic of the program.
     * to delete a customer must need to delete its purchases first.
     *
     * @param customerId is the id of the customer to delete.
     * @throws IdDoesNotExistException if customer was not found
     */
    public void deleteCustomer(int customerId) throws IdDoesNotExistException {
        Customer customer = getOneCustomer(customerId); // to check if exists
        customerRepository.deletePurchaseByCustomerId(customerId);
        customerRepository.deleteById(customerId);
    }

    /**
     * this method is to get one customer and its information from the database for further use.
     *
     * @param customerId is the id of the customer to get.
     * @return Customer object if found.
     * @throws IdDoesNotExistException if customer was not found
     */
    public Customer getOneCustomer(int customerId) throws IdDoesNotExistException {
        return customerRepository.findById(customerId).orElseThrow(() ->
                new IdDoesNotExistException("Customer was not found"));
    }

    /**
     * this method is to get all customers and its information from the database for further use.
     *
     * @return List of Customer or an empty List
     */
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }
}
