import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter} from "@angular/core";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { Company } from "../../model/company";
import { Employee } from "../../model/employee";

@Component({
    selector: "app-link-employees-to-company",
    templateUrl: "./link-employees-to-company.component.html",
    styleUrls: ["./link-employees-to-company.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkEmployeesToCompanyComponent implements OnInit, OnChanges {

    @Input() companyList: Company[];
    @Input() employeeList: Employee[];

    @Output() updateCompanyToEmployee: EventEmitter<{employee, company}> = new EventEmitter();

    columnDefs;
    displayedColumns;
    dataSource;

    constructor(
        private localService: LocalStorageService,
    ) { }

    ngOnInit(): void {
        this.buildColumnDef();
        this.displayedColumns = this.columnDefs.map(c => c.columnDef);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(this.localService.getData("companiesList")) {
            this.companyList = JSON.parse(this.localService.getData("companiesList"));
        }
        if(this.localService.getData("employeeList")) {
            this.employeeList = JSON.parse(this.localService.getData("employeeList")).filter(emp => !emp.company);
            this.dataSource = this.employeeList;
        }
    }

    linkCompanyToEmployee(employee) {
        this.updateCompanyToEmployee.emit({employee: employee, company: employee.company});
    }

    removeSelectedCompany(employee) {
       employee.company = "";
    }

    displayCompanyName(companyId: number) {
        return companyId ? this.companyList.filter(comp => comp.id === companyId)[0]?.name : "";
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
                cell: (element: Employee) => element.lastName ? `${element.lastName}` : "--",
            },
            {
                columnDef: "action",
                header: "Actions",
                cell: (element: Employee) => "",
            },
            {
                columnDef: "done",
                header: "",
                cell: (element: Employee) => "",
            },
        ];
    }
}
