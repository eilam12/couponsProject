import Coupon from "./Coupon";

class Company {
    id: number;
    name: string;
    email: string;
    password: string;
    coupons: Coupon[];


    constructor(id: number, name: string, email: string, password: string, coupons: Coupon[]) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.coupons = coupons;
    }
}

export default Company;