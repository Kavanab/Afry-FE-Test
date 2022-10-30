import {Employee} from "../../model/employee";
import {EmployeeActions, EmployeeActionType} from "./employee.actions";

const initialState: Array<Employee> = [];

export function EmployeeReducer(
    state: Array<Employee> = initialState,
    action: EmployeeActions,
) {
    switch (action.type) {
        case EmployeeActionType.GetEmployeesSuccess:
            return [...state, ...action.employees];
        case EmployeeActionType.AddEmployeeSuccess:
            return [...state, action.employee];
        case EmployeeActionType.DeleteEmployeeSuccess:
            return [...state, action.employee];
        default:
            return state;
    }
}