import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {CreateCompanyComponent} from "./components/create-company/create-company.component";
import {CreateEmployeeComponent} from "./components/create-employee/create-employee.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HeaderComponent} from "./components/header/header.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { EmployeeService } from "./services/employee.service";

@NgModule({
    declarations: [
        AppComponent,
        CreateCompanyComponent,
        CreateEmployeeComponent,
        HeaderComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatInputModule,
        MatFormFieldModule,
        HttpClientModule,
        // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
        // and returns simulated server responses.
        // Remove it when a real server is ready to receive requests.
        HttpClientInMemoryWebApiModule.forRoot(
            EmployeeService, { dataEncapsulation: false }
        ),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
