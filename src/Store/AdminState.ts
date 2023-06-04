import Company from "../Models/Company";
import Customer from "../Models/Customer";
import { createStore } from "redux";

export class AdminState {
    public companies: Company[] = [];
    public customers: Customer[] = [];
}

export enum AdminActionTypes {
    FetchCompany, AddCompany, DeleteCompany, UpdateCompany,
    FetchCustomer, AddCustomer, DeleteCustomer, UpdateCustomer
}

export interface AdminAction {
    type: AdminActionTypes,
    payload: any
}

export function fetchCompany(companies: Company[]) {
    return { type: AdminActionTypes.FetchCompany, payload: companies };
}

export function addCompany(company: Company) {
    return { type: AdminActionTypes.AddCompany, payload: company };
}

export function updateCompany(company: Company) {
    return { type: AdminActionTypes.UpdateCompany, payload: company };
}

export function deleteCompany(id: number) {
    return { type: AdminActionTypes.DeleteCompany, payload: id };
}

export function fetchCustomer(customers: Customer[]) {
    return { type: AdminActionTypes.FetchCustomer, payload: customers };
}

export function addCustomer(customer: Customer) {
    return { type: AdminActionTypes.AddCustomer, payload: customer };
}

export function updateCustomer(customer: Customer) {
    return { type: AdminActionTypes.UpdateCustomer, payload: customer };
}

export function deleteCustomer(id: number) {
    return { type: AdminActionTypes.DeleteCustomer, payload: id };
}

function adminReducer(currentState = new AdminState(), action: AdminAction) {

    const newState = { ...currentState }; // duplicate of current state

    switch (action.type) {
        case AdminActionTypes.FetchCompany:
            newState.companies = action.payload;
            break;

        case AdminActionTypes.AddCompany:
            newState.companies.push(action.payload);
            break;

        case AdminActionTypes.UpdateCompany:
            const companyId = action.payload.id
            const companyIndex = newState.companies.findIndex(c => c.id == companyId);
            if (companyIndex >= 0)
                newState.companies[companyIndex] = action.payload;
            break;

        case AdminActionTypes.DeleteCompany:
            const id = action.payload;
            const index = newState.companies.findIndex(c => c.id == id);
            if (index >= 0)
                newState.companies.splice(index, 1);
            break;

        case AdminActionTypes.FetchCustomer:
            newState.customers = action.payload;
            break;

        case AdminActionTypes.AddCustomer:
            newState.customers.push(action.payload);
            break;

        case AdminActionTypes.UpdateCustomer:
            const customerId = action.payload.id;
            const customerIndex = newState.customers.findIndex(c => c.id == customerId);
            if (customerId >= 0)
                newState.customers[customerIndex] = action.payload;
            break;

        case AdminActionTypes.DeleteCustomer:
            const id2 = action.payload;
            const index2 = newState.customers.findIndex(c => c.id == id2);
            if (index2 >= 0)
                newState.customers.splice(index2, 1);
            break;
    }

    return newState;
}

export const adminStore = createStore(adminReducer);


