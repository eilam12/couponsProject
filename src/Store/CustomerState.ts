import { createStore } from "redux";
import Coupon from "../Models/Coupon";
import Customer from "../Models/Customer";

export class CustomerState {
    public coupons: Coupon[] = [];
    public customer: Customer = null;
}

export enum CustomerActionTypes {
    FetchCustomer, FetchCoupon, AddCoupon, DeleteCoupon
}

export interface CustomerAction {
    type: CustomerActionTypes,
    payload: any
}

export function fetchTheCustomer(customer: Customer) {
    return { type: CustomerActionTypes.FetchCustomer, payload: customer };
}

export function fetchCoupon(coupons: Coupon[]) {
    return { type: CustomerActionTypes.FetchCoupon, payload: coupons };
}

export function addCoupon(coupon: Coupon) {
    return { type: CustomerActionTypes.AddCoupon, payload: coupon };
}

export function deleteCoupon(id: number) {
    return { type: CustomerActionTypes.DeleteCoupon, payload: id };
}

function customerReducer(currentState = new CustomerState(), action: CustomerAction) {

    const newState = { ...currentState };

    switch (action.type) {
        case CustomerActionTypes.FetchCustomer:
            newState.customer = action.payload
            break;

        case CustomerActionTypes.FetchCoupon:
            newState.coupons = action.payload;
            break;

        case CustomerActionTypes.AddCoupon:
            newState.coupons.push(action.payload);
            break;

        case CustomerActionTypes.DeleteCoupon:
            const id = action.payload;
            const index = newState.coupons.findIndex(c => c.id == id);
            if (index >= 0)
                newState.coupons.splice(index, 1);
            break;
    }
    return newState;
}

export const customerStore = createStore(customerReducer);