import {Component, OnInit, ChangeDetectionStrategy} from "@angular/core";

@Component({
    selector: "app-create-employee",
    templateUrl: "./create-employee.component.html",
    styleUrls: ["./create-employee.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEmployeeComponent implements OnInit {

    employee = {};

    constructor() {}
    
    ngOnInit(): void {
        this.employee = {
            id:1,
            name: "test",
        };
    }

}
