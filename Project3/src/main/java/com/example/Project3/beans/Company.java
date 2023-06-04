package com.example.Project3.beans;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.List;

/**
 * Company class is the Entity layer of a Company.
 * it represents a Company in the server side and has all of it's parameters
 */
@Entity
@Table(name = "companies")
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name, email, password;
    @OneToMany(mappedBy = "company", fetch = FetchType.EAGER)
    @Cascade(org.hibernate.annotations.CascadeType.DELETE)
    private List<Coupon> coupons;

    // empty ctor for hibernate
    public Company() {
    }

    /**
     * this method is a constructor for creating new company in the database. it doesn't include id because this parameter is
     * autoincrement in the database, and doesn't include the company coupons because this parameter doesn't need to be put when
     * creating new company
     *
     * @param name
     * @param email
     * @param password
     */
    public Company(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    /**
     * this method is a constructor for reading information from the database.
     * there is no id in the constructor because spring takes care of it
     *
     * @param name
     * @param email
     * @param password
     * @param coupons
     */
    public Company(String name, String email, String password, List<Coupon> coupons) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.coupons = coupons;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
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

    @JsonIgnore
    public List<Coupon> getCoupons() {
        return coupons;
    }

    @Override
    public String toString() {
        return "Company{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", coupons=" + coupons +
                '}' + "\n";
    }
}
