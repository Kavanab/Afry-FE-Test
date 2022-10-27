import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit} from "@angular/core";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {LocalStorageService} from "../../services/local-storage.service";
import {Company} from "../../model/company";
import {Employee} from "../../model/employee";

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


    constructor(
        private formBuilder: UntypedFormBuilder,
        private localService: LocalStorageService,
    ) {
    }

    ngOnInit(): void {
        this.getEmployees.emit();
    }
    
    ngOnChanges(changes: SimpleChanges): void {
        if(this.localService.getData("employeeList")) {
            this.employeeList = JSON.parse(this.localService.getData("employeeList"));
        }
        if(this.localService.getData("companiesList")) {
            this.companyList = JSON.parse(this.localService.getData("companiesList"));
        }
        console.log(this.employeeList, this.companyList);
    }

    createEmployeeForm: UntypedFormGroup = this.formBuilder.group({
        firstName: [null, Validators.required],
        lastName: [null],
        companyName: [null],
    });

    onCreateEmployee() {
        if(this.createEmployeeForm.valid) {
            this.createEmployee.emit({...this.createEmployeeForm.value});
            this.createEmployeeForm.reset();
        }
    }
}
