import {HttpErrorResponse} from "@angular/common/http";
import {Action} from "@ngrx/store";
import {Employee} from "../../model/employee";

export enum EmployeeActionType {
    GetEmployees = "[Employee] Get Employees",
    GetEmployeesSuccess = "[Employee] Get Employees success",

    AddEmployee = "[Employee] Add Employee",
    AddEmployeeSuccess = "[Employee] Add Employee success",
    AddEmployeeFailure = "[Employee] Add Employee failure",

    DeleteEmployee = "[Employee] Delete Employee",
    DeleteEmployeeSuccess = "[Employee] Delete Employee success",
}
export class GetEmployees implements Action {
    readonly type = EmployeeActionType.GetEmployees;
}

export class GetEmployeesSuccess implements Action {
    readonly type = EmployeeActionType.GetEmployeesSuccess;
    constructor(public employees: Employee[]) {}
}

export class AddEmployee implements Action {
    readonly type = EmployeeActionType.AddEmployee;
    constructor(public employee: Employee) {}
}

export class AddEmployeeSuccess implements Action {
    readonly type = EmployeeActionType.AddEmployeeSuccess;
    constructor(public employee: Employee) {}
}

export class AddEmployeeFailure implements Action {
    readonly type = EmployeeActionType.AddEmployeeFailure;
    constructor(public error: HttpErrorResponse) {}
}

export class DeleteEmployee implements Action {
    readonly type = EmployeeActionType.DeleteEmployee;
    constructor(public employee: Employee) {}
}

export class DeleteEmployeeSuccess implements Action {
    readonly type = EmployeeActionType.DeleteEmployeeSuccess;
    constructor(public employee: Employee) {}
}

export type EmployeeActions = 
    GetEmployees | 
    GetEmployeesSuccess | 
    AddEmployee | 
    AddEmployeeSuccess | 
    AddEmployeeFailure |
    DeleteEmployee |
    DeleteEmployeeSuccess;