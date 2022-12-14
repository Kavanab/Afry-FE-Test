import {Company} from "../../model/company";
import {CompanyActions, CompanyActionType} from "./company.actions";

const initialState: Array<Company> = [];

export function CompanyReducer(
    state: Array<Company> = initialState,
    action: CompanyActions,
) {
    switch (action.type) {
        case CompanyActionType.GetCompaniesSuccess:
            return [...state, ...action.companies];
        case CompanyActionType.DeleteEmployeeSuccess:
            return [...state, action.employee];
        case CompanyActionType.AddCompanySuccess:
            return [...state, action.company];
        default:
            return state;
    }
}