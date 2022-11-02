import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {AppState} from "../../store/state.model";
import {Company} from "../../model/company";
import {AddCompany, GetCompanies} from "../../store/company/company.actions";
import {Employee} from "../../model/employee";
import {DeleteEmployee} from "../../store/company/company.actions";

@Component({
    selector: "app-create-company-container",
    templateUrl: "./create-company-container.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCompanyContainerComponent implements OnInit {
    companyList$: Observable<Company[]>;
    employeeList$: Observable<Employee[]>;

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.companyList$ = this.store.select((store) => store.companies);
        this.employeeList$ = this.store.select((store) => store.employees);
    }

    getCompanies() {
        this.store.dispatch(new GetCompanies());
    }
    
    createCompany(company) {
        this.store.dispatch(new AddCompany(company));
    }

    deleteEmployeeFromCompany(employee) {
        this.store.dispatch(new DeleteEmployee(employee));
    }
}
