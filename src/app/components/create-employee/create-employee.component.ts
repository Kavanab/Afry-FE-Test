import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit} from "@angular/core";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {LocalStorageService} from "../../services/local-storage.service";
import {Company} from "../../model/company";
import {Employee} from "../../model/employee";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

@Component({
    selector: "app-create-employee",
    templateUrl: "./create-employee.component.html",
    styleUrls: ["./create-employee.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEmployeeComponent implements OnInit, OnChanges {

    @Input() employeeList: Employee[];
    @Input() companyList: Company[];
    @Output() createEmployee: EventEmitter<Employee> = new EventEmitter();
    @Output() getEmployees: EventEmitter<void> = new EventEmitter();

    filteredCompanies: Observable<Company[]>;

    createEmployeeForm: UntypedFormGroup = this.formBuilder.group({
        firstName: [null, Validators.required],
        lastName: [null],
        company: [null],
    });

    constructor(
        private formBuilder: UntypedFormBuilder,
        private localService: LocalStorageService,
    ) {
    }

    ngOnInit(): void {
        this.getEmployees.emit();
        this.filteredCompanies = this.createEmployeeForm.get("company").valueChanges.pipe(
            startWith(""),
            map(value => {
                const name = typeof value === "string" ? value : value?.name;
                return name ? this._filterCompanies(name as string) : this.companyList.slice();
            }),
        );
    }
    
    ngOnChanges(changes: SimpleChanges): void {
        if(this.localService.getData("employeeList")) {
            this.employeeList = JSON.parse(this.localService.getData("employeeList"));
        }
        if(this.localService.getData("companiesList")) {
            this.companyList = JSON.parse(this.localService.getData("companiesList"));
        }
        console.log(this.employeeList);
        
    }

    onCreateEmployee() {
        if(this.createEmployeeForm.valid) {
            const empData: Employee = {
                firstName: this.createEmployeeForm.value.firstName,
                lastName: this.createEmployeeForm.value.lastName,
                company: this.createEmployeeForm.value.company?.id,
            };
            this.createEmployee.emit(empData);
            this.createEmployeeForm.reset();
        }
    }

    displayFn(company: Company): string {
        return company && company.id ? company.name : "";
    }

    private _filterCompanies(value: string): Company[] {
        const filterValue = value.toLowerCase();
    
        return this.companyList.filter(option => option.name.toLowerCase().includes(filterValue));
    }
}
