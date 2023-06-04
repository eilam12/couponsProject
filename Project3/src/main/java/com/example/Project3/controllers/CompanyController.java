package com.example.Project3.controllers;

import com.example.Project3.beans.Category;
import com.example.Project3.beans.Company;
import com.example.Project3.beans.Coupon;
import com.example.Project3.beans.TheSession;
import com.example.Project3.exceptions.IdDoesNotExistException;
import com.example.Project3.exceptions.TitleAlreadyExistException;
import com.example.Project3.exceptions.UnauthorizedException;
import com.example.Project3.services.CompanyBL;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;

/**
 * CompanyController class is the class that used to expose the end points of the server side of a Company to the client side,
 * using methods that connects to the CompanyBL.
 */
@RestController
@RequestMapping("company")
public class CompanyController {

    private HttpServletRequest request;
    private HashMap<String, TheSession> sessions;

    public CompanyController(HttpServletRequest request, HashMap<String, TheSession> sessions) {
        this.request = request;
        this.sessions = sessions;
    }

    /**
     * This method is to get the object of the BL layer to use in the methods in the controller.
     * It checks if there is a valid token and if so getting and returning the fitting ClientBL using the token.
     *
     * @return (CompanyBL) ClientBL
     * @throws UnauthorizedException
     */
    public CompanyBL getService() throws UnauthorizedException {
        String token = request.getHeader("authorization").replace("Bearer ", "");
        if (sessions.containsKey(token)) {
            return (CompanyBL) sessions.get(token).getClientBL();
        }
        throw new UnauthorizedException();
    }

    /**
     * This method is to expose the end point of adding a coupon.
     *
     * @param coupon is the coupon to add.
     * @return ResponseEntity with the coupon after adding it if the process succeeded.
     * @throws UnauthorizedException
     * @throws TitleAlreadyExistException
     */
    @PostMapping("/addCoupon")
    public ResponseEntity<?> addCoupon(@RequestBody Coupon coupon) throws UnauthorizedException,
            TitleAlreadyExistException {
        getService().addCoupon(coupon);
        return ResponseEntity.ok(coupon);
    }

    /**
     * This method is to expose the end point of updating a coupon.
     *
     * @param coupon is the coupon to update.
     * @return ResponseEntity with a String if the process succeeded.
     * @throws UnauthorizedException
     * @throws TitleAlreadyExistException
     */
    @PutMapping("/updateCoupon")
    public ResponseEntity<?> updateCoupon(@RequestBody Coupon coupon) throws UnauthorizedException,
            TitleAlreadyExistException {
        getService().updateCoupon(coupon);
        return ResponseEntity.ok("Updated successfully");
    }

    /**
     * This method is to expose the end point of deleting a coupon.
     *
     * @param couponId is the id of the coupon to delete.
     * @return ResponseEntity with a String if the process succeeded.
     * @throws UnauthorizedException
     * @throws IdDoesNotExistException
     */
    @DeleteMapping("/deleteCoupon/{couponId}")
    public ResponseEntity<?> deleteCoupon(@PathVariable int couponId) throws UnauthorizedException, IdDoesNotExistException {
        getService().deleteCoupon(couponId);
        return ResponseEntity.ok("Deleted successfully");
    }

    /**
     * This method is to expose the end point of getting the company's coupons.
     *
     * @return List of Coupon or an empty List if the process succeeded.
     * @throws UnauthorizedException
     */
    @GetMapping("/getCoupons")
    public List<Coupon> getCompanyCoupons() throws UnauthorizedException {
        return getService().getCompanyCoupons();
    }

    /**
     * This method is to expose the end point of getting the company's coupons by a category.
     *
     * @param category is the category to filter the coupons by.
     * @return List of Coupon or an empty List if the process succeeded.
     * @throws UnauthorizedException
     */
    @GetMapping("/getCouponsByCategory/{category}")
    public List<Coupon> getCompanyCouponsByCategory(@PathVariable Category category) throws UnauthorizedException {
        return getService().getCompanyCouponsByCategory(category);
    }

    /**
     * This method is to expose the end point of getting the company's coupons by a max price.
     *
     * @param maxPrice is the price to filter the coupons by.
     * @return List of Coupon or an empty List if the process succeeded.
     * @throws UnauthorizedException
     */
    @GetMapping("/getCouponsByMaxPrice/{maxPrice}")
    public List<Coupon> getCompanyCouponsByMaxPrice(@PathVariable double maxPrice) throws UnauthorizedException {
        return getService().getCompanyCouponsByMaxPrice(maxPrice);
    }

    /**
     * This method is to expose the end point of getting the company's details, hence the company.
     *
     * @return Company objet if the process succeeded.
     * @throws UnauthorizedException
     */
    @GetMapping("/getDetails")
    public Company getCompanyDetails() throws UnauthorizedException {
        return getService().getCompanyDetails();
    }
}
