import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CreateCompanyContainerComponent} from "./containers/company/create-company-container.component";
import {CreateEmployeeContainerComponent} from "./containers/employee/create-employee-container.component";

const routes: Routes = [
    {path: "employee", component: CreateEmployeeContainerComponent},
    {path: "company", component: CreateCompanyContainerComponent},
    {path: "", redirectTo: "/employee", pathMatch: "full"},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
