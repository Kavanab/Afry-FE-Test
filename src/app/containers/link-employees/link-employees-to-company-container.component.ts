import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {Company} from "src/app/model/company";
import {Employee} from "src/app/model/employee";
import {Store} from "@ngrx/store";
import {AppState} from "src/app/store/state.model";
import { UpdateEmployee } from "src/app/store/employee/employee.actions";

@Component({
    selector: "app-link-employees-to-company-container",
    templateUrl: "./link-employees-to-company-container.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkEmployeesToCompanyContainerComponent implements OnInit {

    employeeList$: Observable<Employee[]>;
    companyList$: Observable<Company[]>;

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.employeeList$ = this.store.select((store) => store.employees);
        this.companyList$ = this.store.select((store) => store.companies);
    }

    updateCompanyToEmployee(data) {
        if(data) {
            this.store.dispatch(new UpdateEmployee(data.employee, data.company));
        }
        
    }
}
