import {fakeAsync, TestBed, waitForAsync} from "@angular/core/testing";
import {FormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CreateCompanyComponent} from "./create-company.component";

describe("CreateCompanyComponent", () => {
    let createCompanyComponent;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [CreateCompanyComponent],
            imports: [MatDialogModule, BrowserAnimationsModule, FormsModule],
        }).compileComponents();
    
        const fixture = TestBed.createComponent(CreateCompanyComponent);
        createCompanyComponent = fixture.componentInstance;
    });

    describe("ngOnInit", () => {
        it("should emit getCompanies event for initial load", fakeAsync(() => {
            spyOn(createCompanyComponent.getCompanies, "emit");
            createCompanyComponent.ngOnInit();
            expect(createCompanyComponent.getCompanies.emit).toHaveBeenCalled();
        }));
    });

    describe("ngOnChanges", () => {
        it("should set employeelist", fakeAsync(() => {
            const employeeList = JSON.stringify([{id: 1, firstName: "test", lastName: "last", company: 1}]);
            spyOn(createCompanyComponent.localService, "getData").and.returnValue(employeeList);
            createCompanyComponent.ngOnChanges();
            expect(createCompanyComponent.employeeList).toEqual(JSON.parse(employeeList));
            expect(createCompanyComponent.dataSource).toEqual(JSON.parse(employeeList));
        }));

        it("should set companyList", fakeAsync(() => {
            const companyList = JSON.stringify([{id: 1, name: "companytest"}]);
            spyOn(createCompanyComponent.localService, "getData").and.returnValue(companyList);
            createCompanyComponent.ngOnChanges();
            expect(createCompanyComponent.companyList).toEqual(JSON.parse(companyList));
        }));
    });

    describe("deleteEmployee", () => {
        it("should emit deleteEmployeeFromCompany event", waitForAsync(() => {
            spyOn(createCompanyComponent.deleteEmployeeFromCompany, "emit");
            const employee = {
                id: 1, 
                firstName: "test",
                lastName: "",
                company: 1,
            };
            createCompanyComponent.deleteEmployee();
            expect(createCompanyComponent.deleteEmployeeFromCompany.emit).toHaveBeenCalledWith({company: undefined});
        }));
    });
});
