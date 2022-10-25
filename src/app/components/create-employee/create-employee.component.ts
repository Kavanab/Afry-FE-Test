import {Component, ChangeDetectionStrategy, OnInit} from "@angular/core";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../services/employee.service";

@Component({
    selector: "app-create-employee",
    templateUrl: "./create-employee.component.html",
    styleUrls: ["./create-employee.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEmployeeComponent implements OnInit{

    
    constructor(
        private fb: UntypedFormBuilder, 
        private employeeService: EmployeeService,
    ) {

    }
    
    createEmployeeForm: UntypedFormGroup = this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null],
        companyName: [null],
    });

    ngOnInit(): void {
        this.employeeService.getEmployees().subscribe((data) => console.log("empdata: ", data));
    }

    onCreate() {
        if(this.createEmployeeForm.valid) {
            this.employeeService.createEmployee({...this.createEmployeeForm.value}).subscribe((data) => {
                this.employeeService.getEmployees().subscribe((data1) => console.log("empdata: ", data1));
            });
        }
    }
}
