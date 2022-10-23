import {Component, ChangeDetectionStrategy} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: "app-create-employee",
    templateUrl: "./create-employee.component.html",
    styleUrls: ["./create-employee.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEmployeeComponent {

    
    constructor(private fb: FormBuilder) {}
    
    createEmployeeForm: FormGroup = this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null],
        companyName: [null],
    });

    onCreate() {
        if(this.createEmployeeForm.valid) {
            console.log(this.createEmployeeForm.value);
        }
    }
}
