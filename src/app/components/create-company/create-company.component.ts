import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";

@Component({
    selector: "app-create-company",
    templateUrl: "./create-company.component.html",
    styleUrls: ["./create-company.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCompanyComponent implements OnInit {

    companies: any = [];

    constructor() { }

    ngOnInit(): void {
        this.companies = [{
            id:1,
            name: "test comapny",
        }];
    }

}
