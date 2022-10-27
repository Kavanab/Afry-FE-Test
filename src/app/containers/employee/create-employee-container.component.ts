import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {AppState} from "../../store/state.model";
import {Employee} from "../../model/employee";
import {AddEmployee} from "src/app/store/employee/employee.actions";
import {Company} from "src/app/model/company";

@Component({
    selector: "app-create-employee-container",
    templateUrl: "./create-employee-container.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEmployeeContainerComponent implements OnInit {
    employeeList$: Observable<Employee[]>;
    companyList$: Observable<Company[]>;

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.employeeList$ = this.store.select((store) => store.employees);
        this.companyList$ = this.store.select((store) => store.companies);
    }

    createEmployee(emp) {
        this.store.dispatch(new AddEmployee(emp));
    }
}