import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {CreateCompanyComponent} from "./components/create-company/create-company.component";
import {CreateEmployeeComponent} from "./components/create-employee/create-employee.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HeaderComponent} from "./components/header/header.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {DataService} from "./services/data.service";
import {AngularMaterialModule} from "./material.module";
import {FormsModule} from "@angular/forms";
import {AddCompanyModalComponent} from "./components/add-company-modal/add-company-modal.component";
import {StoreModule} from "@ngrx/store";
import {EmployeeReducer} from "./store/employee/employee.reducer";
import {EmployeeEffects} from "./store/employee/employee.effects";
import {CreateEmployeeContainerComponent} from "./containers/employee/create-employee-container.component";
import {EffectsModule} from "@ngrx/effects";
import {CompanyEffects} from "./store/company/company.effects";
import {CompanyReducer} from "./store/company/company.reducer";
import {CreateCompanyContainerComponent} from "./containers/company/create-company-container.component";

@NgModule({
    declarations: [
        AppComponent,
        CreateCompanyComponent,
        CreateEmployeeComponent,
        CreateEmployeeContainerComponent,
        HeaderComponent,
        AddCompanyModalComponent,
        CreateCompanyContainerComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        AngularMaterialModule,
        HttpClientModule,
        // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
        // and returns simulated server responses.
        // Remove it when a real server is ready to receive requests.
        HttpClientInMemoryWebApiModule.forRoot(
            DataService, { dataEncapsulation: false },
        ),
        StoreModule.forRoot({
            employees: EmployeeReducer,
            companies: CompanyReducer,
        }),
        EffectsModule.forRoot([
            EmployeeEffects,
            CompanyEffects,
        ]),
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
