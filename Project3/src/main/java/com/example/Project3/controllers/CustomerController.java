package com.example.Project3.controllers;

import com.example.Project3.beans.Category;
import com.example.Project3.beans.Coupon;
import com.example.Project3.beans.Customer;
import com.example.Project3.beans.TheSession;
import com.example.Project3.exceptions.*;
import com.example.Project3.services.CustomerBL;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;

/**
 * CustomerController class is the class that used to expose the end points of the server side of a Customer to the client side,
 * using methods that connects to the CustomerBL.
 */
@RestController
@RequestMapping("customer")
public class CustomerController {

    private HttpServletRequest request;
    private HashMap<String, TheSession> sessions;

    public CustomerController(HttpServletRequest request, HashMap<String, TheSession> sessions) {
        this.request = request;
        this.sessions = sessions;
    }

    /**
     * This method is to get the object of the BL layer to use in the methods in the controller.
     * It checks if there is a valid token and if so getting and returning the fitting ClientBL using the token.
     *
     * @return (CustomerBL) ClientBL
     * @throws UnauthorizedException
     */
    public CustomerBL getService() throws UnauthorizedException {
        String token = request.getHeader("authorization").replace("Bearer ", "");
        if (sessions.containsKey(token)) {
            return (CustomerBL) sessions.get(token).getClientBL();
        }
        throw new UnauthorizedException();
    }

    /**
     * This method is to expose the end point of purchasing a coupon.
     *
     * @param coupon is the coupon to purchase.
     * @return ResponseEntity with a String if the process succeeded.
     * @throws UnauthorizedException
     * @throws CouponAmountIsZeroException
     * @throws CouponDateIsExpiredException
     * @throws PurchaseAlreadyExistException
     */
    @PostMapping("/purchaseCoupon")
    public ResponseEntity<?> purchaseCoupon(@RequestBody Coupon coupon) throws UnauthorizedException, CouponAmountIsZeroException,
            CouponDateIsExpiredException, PurchaseAlreadyExistException {
        getService().purchaseCoupon(coupon);
        return ResponseEntity.ok("Coupon purchased");
    }

    /**
     * This method is to expose the end point of getting the customer's coupons.
     *
     * @return List of Coupon or an empty List if the process succeeded.
     * @throws UnauthorizedException
     */
    @GetMapping("/getCustomerCoupons")
    public List<Coupon> getCustomerCoupons() throws UnauthorizedException {
        return getService().getCustomersCoupons();
    }

    /**
     * This method is to expose the end point of getting the customer's coupons by a category.
     *
     * @param category is the category to filter the coupons by.
     * @return List of Coupon or an empty List if the process succeeded.
     * @throws UnauthorizedException
     */
    @GetMapping("/getCouponsByCategory/{category}")
    public List<Coupon> getCustomerCouponsByCategory(@PathVariable Category category) throws UnauthorizedException {
        return getService().getCustomerCouponsByCategory(category);
    }

    /**
     * This method is to expose the end point of getting the customer's coupons by a max price.
     *
     * @param maxPrice is the price to filter the coupons by.
     * @return List of Coupon or an empty List if the process succeeded.
     * @throws UnauthorizedException
     */
    @GetMapping("/getCouponsByMaxPrice/{maxPrice}")
    public List<Coupon> getCustomerCouponsByMaxPrice(@PathVariable double maxPrice) throws UnauthorizedException {
        return getService().getCustomerCouponsByMaxPrice(maxPrice);
    }

    /**
     * This method is to expose the end point of deleting a purchase.
     *
     * @param couponId is the id of the coupon to delete from the customer purchases.
     * @return ResponseEntity with a String if the process succeeded.
     * @throws UnauthorizedException
     * @throws IdDoesNotExistException
     * @throws PurchaseDoesntExistException
     */
    @DeleteMapping("/deletePurchase/{couponId}")
    public ResponseEntity<?> deleteCustomerPurchase(@PathVariable int couponId) throws UnauthorizedException,
            IdDoesNotExistException, PurchaseDoesntExistException {
        getService().deleteCustomerPurchase(couponId);
        return ResponseEntity.ok("Deleted successfully");
    }

    /**
     * This method is to expose the end point of getting all the coupons.
     *
     * @return List of Coupon or an empty List if the process succeeded.
     * @throws UnauthorizedException
     */
    @GetMapping("/getAllCoupons")
    public List<Coupon> getAllCoupons() throws UnauthorizedException {
        return getService().getAllCoupons();
    }

    /**
     * This method is to expose the end point of getting the customer's details, hence the customer.
     *
     * @return Customer objet if the process succeeded.
     * @throws UnauthorizedException
     */
    @GetMapping("/getDetails")
    public Customer getCustomerDetails() throws UnauthorizedException {
        return getService().getCustomerDetails();
    }
}
