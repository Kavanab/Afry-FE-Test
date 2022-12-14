import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Observable, of} from "rxjs";
import * as CompanyActions from "./company.actions";
import {catchError, mergeMap, map} from "rxjs/operators";
import {CompanyService} from "src/app/services/company.service";
import {Company} from "src/app/model/company";
import {Action} from "@ngrx/store";
import {HttpErrorResponse} from "@angular/common/http";
import { Employee } from "src/app/model/employee";

@Injectable()
export class CompanyEffects {

    constructor(private actions$: Actions, private companyService: CompanyService) {}

    @Effect()
    getCompanies$: Observable<Action> = this.actions$.pipe(
        ofType(CompanyActions.CompanyActionType.GetCompanies),
        mergeMap((action: CompanyActions.GetCompanies) => {
            return this.companyService.getCompanies().pipe(
                map((data: Company[]) => new CompanyActions.GetCompaniesSuccess(data)),
                catchError((error: HttpErrorResponse) => of(new CompanyActions.GetCompaniesFailure(error))),
            );
        }),
    );    

    @Effect()
    addCompany$: Observable<Action> = this.actions$.pipe(
        ofType(CompanyActions.CompanyActionType.AddCompany),
        mergeMap((action: CompanyActions.AddCompany) => {
            return this.companyService.createCompany(action.company).pipe(
                map((data: Company) => new CompanyActions.AddCompanySuccess(data)),
                catchError((error: HttpErrorResponse) => of(new CompanyActions.AddCompanyFailure(error))),
            );
        }),
    );

    @Effect()
    deleteEmployee$: Observable<Action> = this.actions$.pipe(
        ofType(CompanyActions.CompanyActionType.DeleteEmployee),
        mergeMap((action: CompanyActions.DeleteEmployee) => {
            return this.companyService.deleteEmployeeFromCompany(action.employee).pipe(
                map((data: Employee) => new CompanyActions.DeleteEmployeeSuccess(data)),
                catchError((error: HttpErrorResponse) => of(new CompanyActions.DeleteEmployeeFailure(error))),
            );
        }),
    );
}