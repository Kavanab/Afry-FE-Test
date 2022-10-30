import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from "@angular/core";
import {Company} from "../../model/company";
import {MatDialog} from "@angular/material/dialog";
import {AddCompanyModalComponent} from "../add-company-modal/add-company-modal.component";
import {LocalStorageService} from "../../services/local-storage.service";
import {Employee} from "../../model/employee";

@Component({
    selector: "app-create-company",
    templateUrl: "./create-company.component.html",
    styleUrls: ["./create-company.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCompanyComponent implements OnInit, OnChanges {

    name: string = "";

    @Input() companyList: Company[];
    @Input() employeeList: Employee[];
    @Output() createCompany: EventEmitter<Company> = new EventEmitter();
    @Output() getCompanies: EventEmitter<void> = new EventEmitter();
    @Output() deleteEmployeeFromCompany: EventEmitter<Employee> = new EventEmitter();

    columnDefs;
    displayedColumns;
    dataSource;

    selectedCompany: any = "All";

    constructor(
        public dialog: MatDialog,
        private localService: LocalStorageService,
    ) { 
    }

    ngOnInit(): void {
        this.getCompanies.emit();
        this.buildColumnDef();
        this.displayedColumns = this.columnDefs.map(c => c.columnDef);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(this.localService.getData("companiesList")) {
            this.companyList = JSON.parse(this.localService.getData("companiesList"));
        }
        if(this.localService.getData("employeeList")) {
            this.employeeList = JSON.parse(this.localService.getData("employeeList")).filter(emp => emp.company);
            this.dataSource = this.employeeList;
        }
    }

    filterEmployees(company) {
        if(company !== "All"){
            this.dataSource = this.employeeList.filter(emp => emp.company === company.id);
        } else {
            this.dataSource = this.employeeList;
        }
    }

    onAddCompany() {
        //open a modal to create a company
        const dialogRef = this.dialog.open(AddCompanyModalComponent, {
            width: "50%",
            data: {name: this.name},
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.createCompany.emit({id: this.companyList.length + 1, name: result} as Company);
            }
        });
    }

    displayCompanyName(companyId: number) {
        return companyId ? this.companyList.filter(comp => comp.id === companyId)[0]?.name : "";
    }

    deleteEmployee(row: Employee) {
        this.deleteEmployeeFromCompany.emit({...row, company: undefined});
    }

    private buildColumnDef () {
        this.columnDefs = [
            {
                columnDef: "id",
                header: "Id",
                cell: (element: Employee) => `${element.id}`,
            },
            {
                columnDef: "firstName",
                header: "First name",
                cell: (element: Employee) => `${element.firstName}`,
            },
            {
                columnDef: "lastName",
                header: "Last name",
                cell: (element: Employee) => `${element.lastName}`,
            },
            {
                columnDef: "company",
                header: "Company",
                cell: (element: Employee) => this.displayCompanyName(element.company),
            },
            {
                columnDef: "action",
                header: "Actions",
                cell: (element: Employee) => "",
            },
        ];
    }
}
