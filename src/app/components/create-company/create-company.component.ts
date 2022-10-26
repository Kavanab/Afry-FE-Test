import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Company} from "../../model/company";
import {CompanyService} from "src/app/services/company.service";
import {MatDialog} from "@angular/material/dialog";
import {AddCompanyModalComponent} from "../add-company-modal/add-company-modal.component";

@Component({
    selector: "app-create-company",
    templateUrl: "./create-company.component.html",
    styleUrls: ["./create-company.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCompanyComponent implements OnInit {

    name: string = "";

    constructor(
        private companyService: CompanyService,
        public dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.companyService.getCompanies().subscribe((data) => console.log("compdata: ", data));
    }

    onAddCompany() {
        //open a modal to create a company
        const dialogRef = this.dialog.open(AddCompanyModalComponent, {
            width: "50%",
            data: {name: this.name},
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.companyService.createCompany({name: result} as Company).subscribe(data => {
                    this.companyService.getCompanies().subscribe((compData) => console.log("compdata: ", compData));
                });
            }
        });
    }

}
