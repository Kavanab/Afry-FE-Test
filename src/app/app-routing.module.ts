import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CreateCompanyComponent} from "./components/create-company/create-company.component";
import {CreateEmployeeComponent} from "./components/create-employee/create-employee.component";

const routes: Routes = [
    {path: "employee", component: CreateEmployeeComponent},
    {path: "company", component: CreateCompanyComponent},
    {path: "", redirectTo: "/employee", pathMatch: "full"},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
