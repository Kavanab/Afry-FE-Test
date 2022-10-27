import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {AppState} from "../../store/state.model";
import {Company} from "../../model/company";
import {AddCompany, GetCompanies} from "../../store/company/company.actions";

@Component({
    selector: "app-create-company-container",
    templateUrl: "./create-company-container.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCompanyContainerComponent implements OnInit {
    companyList$: Observable<Company[]>;

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.companyList$ = this.store.select((store) => store.companies);
    }

    getCompanies() {
        this.store.dispatch(new GetCompanies());
    }
    
    createCompany(emp) {
        this.store.dispatch(new AddCompany(emp));
    }

}
