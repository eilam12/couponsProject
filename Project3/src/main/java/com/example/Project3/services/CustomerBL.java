package com.example.Project3.services;

import com.example.Project3.beans.Category;
import com.example.Project3.beans.Coupon;
import com.example.Project3.beans.Customer;
import com.example.Project3.exceptions.*;
import com.example.Project3.repositories.CompanyRepository;
import com.example.Project3.repositories.CouponRepository;
import com.example.Project3.repositories.CustomerRepository;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

/**
 * CustomerBL class is a class in the BL layer that has the methods that a Customer can use, and this class implements the business
 * logic of the program in the methods. the class will be used as an object that lets a Customer make actions in the program.
 */
@Service
@Scope("prototype")
public class CustomerBL extends ClientBL {

    private Customer theCustomer;

    public CustomerBL(CompanyRepository companyRepository, CustomerRepository customerRepository,
                      CouponRepository couponRepository) {
        super(companyRepository, customerRepository, couponRepository);
    }

    /**
     * Checks if the login parameters are correct when trying to log in as a Customer.
     * if the customer was found than the "theCustomer" parameter of the class will be the object that
     * customerRepository.findByEmailAndPassword() returns.
     *
     * @param email
     * @param password
     * @return true if the login parameters were valid and were found in the database. otherwise false.
     */
    @Override
    public boolean login(String email, String password) {
        Customer customer = customerRepository.findByEmailAndPassword(email, password);
        if (customer == null)
            return false;
        else {
            theCustomer = customer;
            return true;
        }
    }

    /**
     * this method is to add a purchase of a coupon by the specific customer with the business logic.
     * the method checks if the purchase is valid according to the business logic.
     * after the purchase happening the coupon amount needs to be updated in the database.
     *
     * @param coupon is the coupon of the purchase.
     * @throws CouponAmountIsZeroException   if the coupon amount is not above 0.
     * @throws CouponDateIsExpiredException  if the expiration date of the coupon past.
     * @throws PurchaseAlreadyExistException if the customer already purchased that coupon.
     */
    public void purchaseCoupon(Coupon coupon) throws CouponAmountIsZeroException, CouponDateIsExpiredException,
            PurchaseAlreadyExistException {
        if (coupon.getAmount() <= 0)
            throw new CouponAmountIsZeroException("This coupon is no longer available");

        Calendar now = Calendar.getInstance();
        now.set(Calendar.HOUR_OF_DAY, 0);
        now.set(Calendar.MINUTE, 0);
        now.set(Calendar.SECOND, 0);
        if (coupon.getEndDate().before(now.getTime()))
            throw new CouponDateIsExpiredException("Coupon date is expired");

        List<Coupon> coupons = getCustomersCoupons();
        for (Coupon c : coupons) {
            if (c.getId() == coupon.getId())
                throw new PurchaseAlreadyExistException("Purchase Already Exist");
        }
        coupon.setCustomers(new ArrayList<>()); // because of JsonIgnore in coupon, of getCustomers(), the coupon.customers is null when coming from the client side. it's ok to do that because it's not critical to save the customers in the coupon, it's just important to add the purchase, and it's still works.
        theCustomer.getCoupons().add(coupon);
        coupon.getCustomers().add(theCustomer);
        coupon.setAmount(coupon.getAmount() - 1);
        customerRepository.save(theCustomer);
        couponRepository.save(coupon);
    }

    /**
     * this method is to get all coupons that the specific customer purchased.
     *
     * @return List of Coupon or an empty List.
     */
    public List<Coupon> getCustomersCoupons() {
        return theCustomer.getCoupons();
    }

    /**
     * this method is to get all coupons that the specific customer purchased by specific category.
     * the method get all the customer coupons and checks which is in the specific category and filter the List by that.
     *
     * @param category is the category to filter the coupons by.
     * @return List of Coupon or an empty List.
     */
    public List<Coupon> getCustomerCouponsByCategory(Category category) {
        List<Coupon> coupons = getCustomersCoupons();
        return coupons.stream().filter(c -> c.getCategory().equals(category)).collect(Collectors.toList());

    }

    /**
     * this method is to get all coupons that the specific customer purchased up to a maximum price.
     * the method get all the customer coupons and checks which cost until(including) the maximum price
     * and filter the List by that.
     *
     * @param maxPrice is the price to filter the coupons by.
     * @return List of Coupon or an empty List.
     */
    public List<Coupon> getCustomerCouponsByMaxPrice(double maxPrice) {
        List<Coupon> coupons = getCustomersCoupons();
        return coupons.stream().filter(c -> c.getPrice() <= maxPrice).collect(Collectors.toList());
    }

    /**
     * this method is to delete a purchase of a coupon of the specific customer with the business logic.
     * if and after deleting the purchase the coupon amount needs to be updated in the database.
     *
     * @param couponId is the id of the coupon to delete from the customer purchases.
     * @throws PurchaseDoesntExistException if the coupon was not found in the customer purchases.
     * @throws IdDoesNotExistException      if the coupon to delete was not found
     */
    public void deleteCustomerPurchase(int couponId) throws PurchaseDoesntExistException, IdDoesNotExistException {
        boolean found = false;
        for (Coupon c : theCustomer.getCoupons()) {
            if (c.getId() == couponId) {
                theCustomer.getCoupons().remove(c);
                found = true;
                break;
            }
        }
        if (found) {
            Coupon coupon = couponRepository.findById(couponId).orElseThrow(() ->
                    new IdDoesNotExistException("Coupon was not found"));
            System.out.println(coupon);
            coupon.getCustomers().remove(theCustomer);
            coupon.setAmount(coupon.getAmount() + 1);
            customerRepository.save(theCustomer);
            couponRepository.save(coupon);
        } else
            throw new PurchaseDoesntExistException("Purchase was not found");
    }

    /**
     * this method gets all the coupons(not just the customer purchases) so the customer could get the
     * list of coupons and make purchases from that.
     *
     * @return List of Coupon.
     */
    public List<Coupon> getAllCoupons() {
        return couponRepository.findAll();
    }

    /**
     * this method is to get the customer details.
     *
     * @return Customer object - the "theCustomer" parameter of the class.
     */
    public Customer getCustomerDetails() {
        return theCustomer;
    }
}
