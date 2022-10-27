import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from "@angular/core";
import {Company} from "../../model/company";
import {MatDialog} from "@angular/material/dialog";
import {AddCompanyModalComponent} from "../add-company-modal/add-company-modal.component";

@Component({
    selector: "app-create-company",
    templateUrl: "./create-company.component.html",
    styleUrls: ["./create-company.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCompanyComponent implements OnChanges {

    name: string = "";

    @Input() companyList: Company[];
    @Output() createCompany: EventEmitter<Company> = new EventEmitter();

    constructor(
        public dialog: MatDialog,
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(this.companyList);
    }

    onAddCompany() {
        //open a modal to create a company
        const dialogRef = this.dialog.open(AddCompanyModalComponent, {
            width: "50%",
            data: {name: this.name},
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.createCompany.emit({name: result} as Company);
            }
        });
    }

}
