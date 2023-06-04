import Category from "./Category";
import Company from "./Company";
import Customer from "./Customer";

class Coupon {
    id: number;
    title: string;
    company: Company;
    category: Category;
    description: string;
    startDate: Date;
    endDate: Date;
    amount: number;
    price: number;
    image: File | FileList | string;
    customers: Customer[];

    constructor(id: number, title: string, company: Company, category: Category, description: string, startDate: Date,
        endDate: Date, amount: number, price: number, image: File | FileList | string) {
        this.id = id;
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
}
export default Coupon;