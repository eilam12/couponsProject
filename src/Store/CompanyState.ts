import { createStore } from "redux";
import Coupon from "../Models/Coupon";
import Company from "../Models/Company";

export class CompanyState {
    public coupons: Coupon[] = [];
    public company: Company = null;
}

export enum CompanyActionTypes {
    FetchCompany, FetchCoupon, AddCoupon, UpdateCoupon, DeleteCoupon
}

export interface CompanyAction {
    type: CompanyActionTypes,
    payload: any
}

export function fetchTheCompany(company: Company) {
    return { type: CompanyActionTypes.FetchCompany, payload: company };
}

export function fetchCoupon(coupons: Coupon[]) {
    return { type: CompanyActionTypes.FetchCoupon, payload: coupons };
}

export function addCoupon(coupon: Coupon) {
    return { type: CompanyActionTypes.AddCoupon, payload: coupon };
}

export function updateCoupon(coupon: Coupon) {
    return { type: CompanyActionTypes.UpdateCoupon, payload: coupon };
}

export function deleteCoupon(id: number) {
    return { type: CompanyActionTypes.DeleteCoupon, payload: id };
}

function companyReducer(currentState = new CompanyState(), action: CompanyAction) {

    const newState = { ...currentState };

    switch (action.type) {
        case CompanyActionTypes.FetchCompany:
            newState.company = action.payload;
            break;

        case CompanyActionTypes.FetchCoupon:
            newState.coupons = action.payload;
            break;

        case CompanyActionTypes.AddCoupon:
            newState.coupons.push(action.payload);
            break;

        case CompanyActionTypes.UpdateCoupon:
            const couponId = action.payload.id;
            const couponIndex = newState.coupons.findIndex(c => c.id == couponId);
            if (couponIndex >= 0)
                newState.coupons[couponIndex] = action.payload;
            break;

        case CompanyActionTypes.DeleteCoupon:
            const id = action.payload;
            const index = newState.coupons.findIndex(c => c.id == id);
            if (index >= 0)
                newState.coupons.splice(index, 1);
            break;
    }

    return newState;
}

export const companyStore = createStore(companyReducer);