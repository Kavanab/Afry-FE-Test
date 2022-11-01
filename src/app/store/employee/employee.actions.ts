import {HttpErrorResponse} from "@angular/common/http";
import {Action} from "@ngrx/store";
import {Company} from "src/app/model/company";
import {Employee} from "../../model/employee";

export enum EmployeeActionType {
    GetEmployees = "[Employee] Get Employees",
    GetEmployeesSuccess = "[Employee] Get Employees success",
    GetEmployeesFailure = "[Employee] Get Employees failure",

    AddEmployee = "[Employee] Add Employee",
    AddEmployeeSuccess = "[Employee] Add Employee success",
    AddEmployeeFailure = "[Employee] Add Employee failure",

    UpdateEmployee = "[Employee] Update Employee",
    UpdateEmployeeSuccess = "[Employee] Update Employee success",
    UpdateEmployeeFailure = "[Employee] Update Employee failure",
}

export class GetEmployees implements Action {
    readonly type = EmployeeActionType.GetEmployees;
}

export class GetEmployeesSuccess implements Action {
    readonly type = EmployeeActionType.GetEmployeesSuccess;
    constructor(public employees: Employee[]) {}
}

export class GetEmployeesFailure implements Action {
    readonly type = EmployeeActionType.GetEmployeesFailure;
    constructor(public error: HttpErrorResponse) {}
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

export class UpdateEmployee implements Action {
    readonly type = EmployeeActionType.UpdateEmployee;
    constructor(public employee: Employee, public company: Company) {}
}

export class UpdateEmployeeSuccess implements Action {
    readonly type = EmployeeActionType.UpdateEmployeeSuccess;
    constructor(public employee: Employee) {}
}

export class UpdateEmployeeFailure implements Action {
    readonly type = EmployeeActionType.UpdateEmployeeFailure;
    constructor(public error: HttpErrorResponse) {}
}

export type EmployeeActions = 
    GetEmployees | 
    GetEmployeesSuccess | 
    GetEmployeesFailure |
    AddEmployee | 
    AddEmployeeSuccess | 
    AddEmployeeFailure |
    UpdateEmployee |
    UpdateEmployeeSuccess |
    UpdateEmployeeFailure;