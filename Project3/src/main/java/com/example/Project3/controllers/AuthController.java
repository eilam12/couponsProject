package com.example.Project3.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.Project3.beans.ClientType;
import com.example.Project3.beans.TheSession;
import com.example.Project3.services.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;

/**
 * This class is to expose the end points of the auth actions, such as login and logout.
 */
@RestController
@RequestMapping("/auth")
public class AuthController {

    private HttpServletRequest request;

    private LoginManager loginManager;

    private HashMap<String, TheSession> sessions;

    public AuthController(HttpServletRequest request, LoginManager loginManager, HashMap<String, TheSession> sessions) {
        this.request = request;
        this.loginManager = loginManager;
        this.sessions = sessions;
    }

    /**
     * This method is to expose the end point of login.
     * It uses the BL layer to check if the credentials are valid,
     * and if so it's creating a token using the createToken() method and saving it
     * and sending it to the client.
     *
     * @param clientType
     * @param email
     * @param password
     * @return ResponseEntity with a String, token if the login succeeded
     * and a ResponseEntity with a string, massage if the login failed.
     */
    @PostMapping("/login/{clientType}/{email}/{password}")
    public ResponseEntity<?> login(@PathVariable ClientType clientType, @PathVariable String email,
                                   @PathVariable String password) {
        try {
            ClientBL clientBL = loginManager.login(clientType, email, password);
            String token = createToken(clientType, clientBL);
            sessions.put(token, new TheSession(clientBL, Calendar.getInstance()));
            return ResponseEntity.ok(token);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage() + ", you are not logged in");
        }
    }

    /**
     * This method is to expose the end point of logout.
     * It takes the token from the request from the client and deleting it.
     *
     * @return String
     */
    @GetMapping("/logout")
    public String logout() {
        String token = request.getHeader("authorization").replace("Bearer ", "");
        sessions.remove(token);
        return "You were logged out";
    }

    /**
     * This method is used to create a token.
     * It gets a ClientType and creating a token according to it that fits to that ClientType.
     *
     * @param clientType
     * @param clientBL
     * @return String, which is the token.
     */
    public String createToken(ClientType clientType, ClientBL clientBL) {
        switch (clientType) {
            case ADMINISTRATOR:
                String token = JWT.create()
                        .withClaim("name", "Admin")
                        .withClaim("clientType", clientType.toString())
                        .withIssuedAt(new Date())
                        .sign(Algorithm.none());
                return token;

            case COMPANY:
                CompanyBL companyBL = (CompanyBL) clientBL;
                String token2 = JWT.create()
                        .withClaim("name", companyBL.getCompanyDetails().getName())
                        .withClaim("clientType", clientType.toString())
                        .withIssuedAt(new Date())
                        .sign(Algorithm.none());
                return token2;

            case CUSTOMER:
                CustomerBL customerBL = (CustomerBL) clientBL;
                String token3 = JWT.create()
                        .withClaim("name", customerBL.getCustomerDetails().getFirstName() +
                                " " + customerBL.getCustomerDetails().getLastName())
                        .withClaim("clientType", clientType.toString())
                        .withIssuedAt(new Date())
                        .sign(Algorithm.none());
                return token3;
        }
        return "";
    }
}
