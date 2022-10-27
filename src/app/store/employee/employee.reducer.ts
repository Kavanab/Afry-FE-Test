import {Employee} from "../../model/employee";
import {EmployeeActions, EmployeeActionType} from "./employee.actions";

const initialState: Array<Employee> = [];

export function EmployeeReducer(
    state: Array<Employee> = initialState,
    action: EmployeeActions,
) {
    switch (action.type) {
        case EmployeeActionType.AddEmployeeSuccess:
            return [...state, action.employee];
        default:
            return state;
    }
}