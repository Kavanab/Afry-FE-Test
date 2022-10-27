import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Observable, of} from "rxjs";
import * as EmployeeActions from "./employee.actions";
import {catchError, mergeMap, map} from "rxjs/operators";
import {EmployeeService} from "src/app/services/employee.service";
import {Employee} from "src/app/model/employee";
import {Action} from "@ngrx/store";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class EmployeeEffects {

    constructor(private actions$: Actions, private employeeService: EmployeeService) {}

    @Effect()
    addEmployee$: Observable<Action> = this.actions$.pipe(
        ofType(EmployeeActions.EmployeeActionType.AddEmployee),
        mergeMap((action: EmployeeActions.AddEmployee) => {
            return this.employeeService.createEmployee(action.employee).pipe(
                map((data: Employee) => new EmployeeActions.AddEmployeeSuccess(data)),
                catchError((error: HttpErrorResponse) => of(new EmployeeActions.AddEmployeeFailure(error))),
            );
        }),
    );
}