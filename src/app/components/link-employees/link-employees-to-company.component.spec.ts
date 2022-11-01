import {fakeAsync, TestBed, waitForAsync} from "@angular/core/testing";
import {LinkEmployeesToCompanyComponent} from "./link-employees-to-company.component";

describe("LinkEmployeesToCompanyComponent", () => {
    let linkEmployeesToCompanyComponent;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [LinkEmployeesToCompanyComponent],
            imports: [],
        }).compileComponents();
    
        const fixture = TestBed.createComponent(LinkEmployeesToCompanyComponent);
        linkEmployeesToCompanyComponent = fixture.componentInstance;
    });

    describe("ngOnChanges", () => {
        it("should set employeelist", fakeAsync(() => {
            const employeeList = JSON.stringify([{id: 1, firstName: "test", lastName: "last"}]);
            spyOn(linkEmployeesToCompanyComponent.localService, "getData").and.returnValue(employeeList);
            linkEmployeesToCompanyComponent.ngOnChanges();
            expect(linkEmployeesToCompanyComponent.employeeList).toEqual(JSON.parse(employeeList));
        }));

        it("should set companyList", fakeAsync(() => {
            const companyList = JSON.stringify([{id: 1, name: "companytest"}]);
            spyOn(linkEmployeesToCompanyComponent.localService, "getData").and.returnValue(companyList);
            linkEmployeesToCompanyComponent.ngOnChanges();
            expect(linkEmployeesToCompanyComponent.companyList).toEqual(JSON.parse(companyList));
        }));
    });

    describe("linkCompanyToEmployee", () => {
        it("should emit updateCompanyToEmployee event", waitForAsync(() => {
            spyOn(linkEmployeesToCompanyComponent.updateCompanyToEmployee, "emit");
            const employee = {
                id: 1, 
                firstName: "test",
                lastName: "",
            };
            const company = {
                id: 1,
                name: "abc",
            };
            linkEmployeesToCompanyComponent.linkedCompany = company;
            linkEmployeesToCompanyComponent.linkCompanyToEmployee(employee);
            expect(linkEmployeesToCompanyComponent.updateCompanyToEmployee.emit).toHaveBeenCalledWith({employee, company});
        }));
    });
});
