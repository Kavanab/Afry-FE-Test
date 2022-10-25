import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Company} from "../../model/company";
import {CompanyService} from "src/app/services/company.service";

@Component({
    selector: "app-create-company",
    templateUrl: "./create-company.component.html",
    styleUrls: ["./create-company.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCompanyComponent implements OnInit {

    constructor(
        private companyService: CompanyService,
    ) { }

    ngOnInit(): void {
        this.companyService.getCompanies().subscribe((data) => console.log("compdata: ", data));
    }

    onAddCompany() {
        //open a modal to create a company
    }

}
