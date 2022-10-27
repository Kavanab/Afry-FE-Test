import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges} from "@angular/core";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Employee} from "../../model/employee";

@Component({
    selector: "app-create-employee",
    templateUrl: "./create-employee.component.html",
    styleUrls: ["./create-employee.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEmployeeComponent implements OnChanges {

    @Input() employeeList: Employee[];
    @Output() createEmployee: EventEmitter<Employee> = new EventEmitter();

    constructor(
        private formBuilder: UntypedFormBuilder,
    ) {
    }
    
    ngOnChanges(changes: SimpleChanges): void {
        console.log(this.employeeList);
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
