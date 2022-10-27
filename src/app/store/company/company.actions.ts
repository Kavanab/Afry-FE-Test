import {HttpErrorResponse} from "@angular/common/http";
import {Action} from "@ngrx/store";
import {Company} from "../../model/company";

export enum CompanyActionType {
    GetCompanies = "[Company] Get Companies",
    GetCompaniesSuccess = "[Company] Get Companies success",

    AddCompany = "[Company] Add Company",
    AddCompanySuccess = "[Company] Add Company success",
    AddCompanyFailure = "[Company] Add Company failure",
}

export class GetCompanies implements Action {
    readonly type = CompanyActionType.GetCompanies;
}

export class GetCompaniesSuccess implements Action {
    readonly type = CompanyActionType.GetCompaniesSuccess;
    constructor(public companies: Company[]) {}
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

export type CompanyActions = GetCompanies | GetCompaniesSuccess | AddCompany | AddCompanySuccess | AddCompanyFailure;