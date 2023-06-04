package com.example.Project3.services;

import com.example.Project3.exceptions.EmailOrPasswordAreWrongException;
import com.example.Project3.repositories.CompanyRepository;
import com.example.Project3.repositories.CouponRepository;
import com.example.Project3.repositories.CustomerRepository;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.sql.SQLException;

/**
 * abstract class that the class's in the BL layer will extend from.
 * this is how they could use the repositories , with the three objects:
 * CompanyRepository
 * CustomerRepository
 * CouponRepository
 */
@Service
@Scope("prototype")
public abstract class ClientBL {
    protected CompanyRepository companyRepository;
    protected CustomerRepository customerRepository;
    protected CouponRepository couponRepository;

    public ClientBL(CompanyRepository companyRepository, CustomerRepository customerRepository,
                    CouponRepository couponRepository) {
        this.companyRepository = companyRepository;
        this.customerRepository = customerRepository;
        this.couponRepository = couponRepository;
    }

    public abstract boolean login(String email, String password) throws SQLException, EmailOrPasswordAreWrongException;
}
