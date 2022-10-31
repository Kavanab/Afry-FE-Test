import {fakeAsync, TestBed, waitForAsync} from "@angular/core/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {CreateEmployeeComponent} from "./create-employee.component";

describe("CreateEmployeeComponent", () => {
    let createEmployeeComponent;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [CreateEmployeeComponent],
            imports: [ReactiveFormsModule, MatAutocompleteModule],
        }).compileComponents();
    
        const fixture = TestBed.createComponent(CreateEmployeeComponent);
        createEmployeeComponent = fixture.componentInstance;
    });

    describe("ngOnInit", () => {
        it("should emit getEmployees event for initial load", fakeAsync(() => {
            spyOn(createEmployeeComponent.getEmployees, "emit");
            createEmployeeComponent.ngOnInit();
            expect(createEmployeeComponent.getEmployees.emit).toHaveBeenCalled();
        }));
    });

    describe("ngOnChanges", () => {
        it("should set employeelist", fakeAsync(() => {
            const employeeList = JSON.stringify([{id: 1, firstName: "test", lastName: "last", company: 1}]);
            spyOn(createEmployeeComponent.localService, "getData").and.returnValue(employeeList);
            createEmployeeComponent.ngOnChanges();
            expect(createEmployeeComponent.employeeList).toEqual(JSON.parse(employeeList));
        }));

        it("should set companyList", fakeAsync(() => {
            const companyList = JSON.stringify([{id: 1, name: "companytest"}]);
            spyOn(createEmployeeComponent.localService, "getData").and.returnValue(companyList);
            createEmployeeComponent.ngOnChanges();
            expect(createEmployeeComponent.companyList).toEqual(JSON.parse(companyList));
        }));
    });

    describe("onCreateEmployee", () => {
        
        describe("with valid form changes", () => {
            beforeEach(() => {
                createEmployeeComponent.createEmployeeForm.patchValue({
                    firstName: "John",
                    lastName: "Krasinki",
                    company: {
                        id: 1,
                        name: "ABC",
                    },
                });
                createEmployeeComponent.createEmployeeForm.markAsDirty();
                createEmployeeComponent.employeeList = [{
                    id: 1,
                    irstName: "Robert",
                    lastName: "",
                    company: 1,
                }];
                createEmployeeComponent.companyList = [{
                    id: 1,
                    name: "ABC",
                }];
            });
    
            it("should dispatch createEmployee event, with valid form changes", waitForAsync(() => {
                spyOn(createEmployeeComponent.createEmployee, "emit");
                const empData = {
                    id: 2,
                    firstName: "John",
                    lastName: "Krasinki",
                    company: 1,
                };
                createEmployeeComponent.onCreateEmployee();
                expect(createEmployeeComponent.createEmployee.emit).toHaveBeenCalledOnceWith(empData);
            }));
        });        

        describe("with valid unchanged form controls", () => {
            it("should do nothing", () => {
                spyOn(createEmployeeComponent.createEmployee, "emit");
                
                createEmployeeComponent.onCreateEmployee();
                expect(createEmployeeComponent.createEmployee.emit).not.toHaveBeenCalled();
            });
        });

        describe("with invalid form changes", () => {
            beforeEach(() => {
                createEmployeeComponent.createEmployeeForm.patchValue({firstName: ""});
            });
            it("should do nothing", () => {
                spyOn(createEmployeeComponent.createEmployee, "emit");
                
                createEmployeeComponent.onCreateEmployee();
                expect(createEmployeeComponent.createEmployee.emit).not.toHaveBeenCalled();
            });
        });
    });
});
