import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {AppState} from "../../store/state.model";
import {Company} from "../../model/company";
import {AddCompany} from "src/app/store/company/company.actions";

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

    createCompany(emp) {
        this.store.dispatch(new AddCompany(emp));
    }

}
