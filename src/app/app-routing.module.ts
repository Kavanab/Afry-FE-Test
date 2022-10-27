import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CreateCompanyComponent} from "./components/create-company/create-company.component";
import {CreateEmployeeContainerComponent} from "./containers/employee/create-employee-container.component";

const routes: Routes = [
    {path: "employee", component: CreateEmployeeContainerComponent},
    {path: "company", component: CreateCompanyComponent},
    {path: "", redirectTo: "/employee", pathMatch: "full"},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
