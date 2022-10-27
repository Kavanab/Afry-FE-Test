import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from "@angular/core";
import {Company} from "../../model/company";
import {MatDialog} from "@angular/material/dialog";
import {AddCompanyModalComponent} from "../add-company-modal/add-company-modal.component";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
    selector: "app-create-company",
    templateUrl: "./create-company.component.html",
    styleUrls: ["./create-company.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCompanyComponent implements OnInit, OnChanges {

    name: string = "";

    @Input() companyList: Company[];
    @Output() createCompany: EventEmitter<Company> = new EventEmitter();
    @Output() getCompanies: EventEmitter<void> = new EventEmitter();

    constructor(
        public dialog: MatDialog,
        private localService: LocalStorageService,
    ) { 
    }

    ngOnInit(): void {
        this.getCompanies.emit();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(this.localService.getData("companiesList")) {
            this.companyList = JSON.parse(this.localService.getData("companiesList"));
        }
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
