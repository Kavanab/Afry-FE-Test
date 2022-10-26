import {Component, Inject} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Company} from "src/app/model/company";

@Component({
    selector: "app-add-company-modal",
    templateUrl: "./add-company-modal.component.html",
    styleUrls: ["./add-company-modal.component.scss"]
})
export class AddCompanyModalComponent {

    constructor(
        public dialogRef: MatDialogRef<AddCompanyModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Company
    ) { }

    onCancel():void {
        this.dialogRef.close();
    }

}
