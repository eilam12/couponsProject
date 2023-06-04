package com.example.Project3.services;

import com.example.Project3.beans.ClientType;
import com.example.Project3.exceptions.EmailOrPasswordAreWrongException;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

/**
 * LoginManager is the class that handle the login in the system.
 * All clients will go throw the LoginManager in order to log in to the system
 */
@Service
public class LoginManager {
    private ApplicationContext ctx;

    public LoginManager(ApplicationContext ctx) {
        this.ctx = ctx;
    }

    /**
     * this method is for login in the program as a client. All clients will go throw this method in order to login.
     * it will return the clientType.
     *
     * @param clientType is the type of client that is login in
     * @param email      is the email of the client
     * @param password   is password of the client
     * @return ClientBL object
     * @throws EmailOrPasswordAreWrongException if one or more of the login parameters were not found
     */
    public ClientBL login(ClientType clientType, String email, String password) throws EmailOrPasswordAreWrongException {
        switch (clientType) {
            case ADMINISTRATOR:
                AdminBL adminBL = ctx.getBean(AdminBL.class);
                if (adminBL.login(email, password))
                    return adminBL;
                else
                    throw new EmailOrPasswordAreWrongException();

            case COMPANY:
                CompanyBL companyBL = ctx.getBean(CompanyBL.class);
                if (companyBL.login(email, password))
                    return companyBL;
                else
                    throw new EmailOrPasswordAreWrongException();

            case CUSTOMER:
                CustomerBL customerBL = ctx.getBean(CustomerBL.class);
                if (customerBL.login(email, password))
                    return customerBL;
                else
                    throw new EmailOrPasswordAreWrongException();
        }
        return null;
    }
}
