import {Company} from "../../model/company";
import {CompanyActions, CompanyActionType} from "./company.actions";

const initialState: Array<Company> = [];

export function CompanyReducer(
    state: Array<Company> = initialState,
    action: CompanyActions,
) {
    switch (action.type) {
        case CompanyActionType.AddCompanySuccess:
            return [...state, action.company];
        default:
            return state;
    }
}