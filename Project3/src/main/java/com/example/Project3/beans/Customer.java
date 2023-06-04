package com.example.Project3.beans;

import javax.persistence.*;
import java.util.List;

/**
 * Customer class is the Entity layer of a Customer.
 * it represents a Customer in the server side and has all of it's parameters
 */
@Entity
@Table(name = "customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String firstName, lastName, email, password;
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Coupon> coupons;

    // empty ctor for hibernate
    public Customer() {
    }

    /**
     * this method is a constructor for creating new customer in the database. it doesn't include id because this parameter is
     * autoincrement in the database, and doesn't include the customer coupons because this parameter doesn't need to be put when
     * creating new customer
     *
     * @param firstName
     * @param lastName
     * @param email
     * @param password
     */
    public Customer(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    /**
     * this method is a constructor for reading information from the database.
     * there is no id in the constructor because spring takes care of it
     *
     * @param firstName
     * @param lastName
     * @param email
     * @param password
     * @param coupons
     */
    public Customer(String firstName, String lastName, String email, String password, List<Coupon> coupons) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.coupons = coupons;
    }

    public int getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Coupon> getCoupons() {
        return coupons;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", coupons=" + coupons +
                '}' + "\n";
    }
}
