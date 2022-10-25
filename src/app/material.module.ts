
import {NgModule} from "@angular/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    imports: [
        MatToolbarModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
    ],
    exports: [
        MatToolbarModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
    ],
})
export class AngularMaterialModule { }