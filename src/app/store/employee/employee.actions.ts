import {HttpErrorResponse} from "@angular/common/http";
import {Action} from "@ngrx/store";
import {Employee} from "../../model/employee";

export enum EmployeeActionType {
    AddEmployee = "[Employee] Add Employee",
    AddEmployeeSuccess = "[Employee] Add Employee success",
    AddEmployeeFailure = "[Employee] Add Employee failure",
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

export type EmployeeActions = AddEmployee | AddEmployeeSuccess;