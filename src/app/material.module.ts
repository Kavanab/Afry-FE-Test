
import {NgModule} from "@angular/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatDialogModule} from "@angular/material/dialog";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatTableModule} from "@angular/material/table";
import {MatSelectModule} from "@angular/material/select";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
    imports: [
        MatToolbarModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatCardModule,
        MatSnackBarModule,
        MatIconModule,
        MatMenuModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatTableModule,
        MatSelectModule,
        MatPaginatorModule,
    ],
    exports: [
        MatToolbarModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatCardModule,
        MatSnackBarModule,
        MatIconModule,
        MatMenuModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatTableModule,
        MatSelectModule,
        MatPaginatorModule
    ],
})
export class AngularMaterialModule { }
