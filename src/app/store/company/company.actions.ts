import {HttpErrorResponse} from "@angular/common/http";
import {Action} from "@ngrx/store";
import {Employee} from "src/app/model/employee";
import {Company} from "../../model/company";

export enum CompanyActionType {
    GetCompanies = "[Company] Get Companies",
    GetCompaniesSuccess = "[Company] Get Companies success",
    GetCompaniesFailure = "[Company] Get Companies failure",

    AddCompany = "[Company] Add Company",
    AddCompanySuccess = "[Company] Add Company success",
    AddCompanyFailure = "[Company] Add Company failure",

    DeleteEmployee = "[Employee] Delete Employee",
    DeleteEmployeeSuccess = "[Employee] Delete Employee success",
    DeleteEmployeeFailure = "[Employee] Delete Employee failure",
}

export class GetCompanies implements Action {
    readonly type = CompanyActionType.GetCompanies;
}

export class GetCompaniesSuccess implements Action {
    readonly type = CompanyActionType.GetCompaniesSuccess;
    constructor(public companies: Company[]) {}
}

export class GetCompaniesFailure implements Action {
    readonly type = CompanyActionType.GetCompaniesFailure;
    constructor(public error: HttpErrorResponse) {}
}

export class AddCompany implements Action {
    readonly type = CompanyActionType.AddCompany;
    constructor(public company: Company) {}
}

export class AddCompanySuccess implements Action {
    readonly type = CompanyActionType.AddCompanySuccess;
    constructor(public company: Company) {}
}

export class AddCompanyFailure implements Action {
    readonly type = CompanyActionType.AddCompanyFailure;
    constructor(public error: HttpErrorResponse) {}
}

export class DeleteEmployee implements Action {
    readonly type = CompanyActionType.DeleteEmployee;
    constructor(public employee: Employee) {}
}

export class DeleteEmployeeSuccess implements Action {
    readonly type = CompanyActionType.DeleteEmployeeSuccess;
    constructor(public employee: Employee) {}
}

export class DeleteEmployeeFailure implements Action {
    readonly type = CompanyActionType.DeleteEmployeeFailure;
    constructor(public error: HttpErrorResponse) {}
}

export type CompanyActions = GetCompanies | 
    GetCompaniesSuccess | 
    GetCompaniesFailure |
    AddCompany | 
    AddCompanySuccess | 
    AddCompanyFailure |
    DeleteEmployee |
    DeleteEmployeeSuccess |
    DeleteEmployeeFailure;