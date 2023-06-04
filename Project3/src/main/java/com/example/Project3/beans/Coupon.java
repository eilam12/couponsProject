package com.example.Project3.beans;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

/**
 * Coupon class is the Entity layer of a Coupon.
 * it represents a Coupon in the server side and has all of it's parameters
 */
@Entity
@Table(name = "coupons")
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    @ManyToOne
    private Company company;
    private Category category;
    private String description;
    private Date startDate, endDate;
    private int amount;
    private double price;
    @Column(columnDefinition = "TEXT")
    private String image;
    @ManyToMany(mappedBy = "coupons", fetch = FetchType.EAGER)
    private List<Customer> customers;

    // empty ctor for hibernate
    public Coupon() {
    }

    /**
     * this method is a constructor that is used to send information to the database
     * or get information from the database, in order to create or read information about coupons.
     * Doesn't include id because it is an autoincrement parameter in the database and a primary key
     * and spring takes care of it.
     *
     * @param title
     * @param company
     * @param category
     * @param description
     * @param startDate
     * @param endDate
     * @param amount
     * @param price
     * @param image
     */
    public Coupon(String title, Company company, Category category, String description, Date startDate, Date endDate,
                  int amount, double price, String image) {
        this.title = title;
        this.company = company;
        this.category = category;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.price = price;
        this.image = image;
    }

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @JsonIgnore
    public List<Customer> getCustomers() {
        return customers;
    }

    public void setCustomers(List<Customer> customers) {
        this.customers = customers;
    }

    @Override
    public String toString() {
        return "Coupon{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", company=" + company.getName() +
                ", category=" + category +
                ", description='" + description + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", amount=" + amount +
                ", price=" + price +
                ", image='" + image + '\'' +
                '}' + "\n";
    }
}
