import {TestBed, inject, waitForAsync} from "@angular/core/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {EmployeeService} from "./employee.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {of} from "rxjs";

describe("EmployeeService", () => {
    let employeeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatSnackBarModule, BrowserAnimationsModule],
            providers: [EmployeeService],
        });
        
    });

    beforeEach(inject([EmployeeService], (_service: EmployeeService) => {
        employeeService = _service;
    }));

    describe("getEmployees()", () => {
        it("should get list of employees", waitForAsync(() => {
            const expectedUrl = "api/employees";
            const expectedEmployees = [{id: 1, firstName: "test", lastName: "test", company: 1}];
            spyOn(employeeService.http, "get").and.returnValue(of(expectedEmployees));

            employeeService.getEmployees().subscribe((result) => {
                expect(result).toEqual(expectedEmployees);
            });

            expect(employeeService.http.get).toHaveBeenCalledOnceWith(expectedUrl);
        }));
    });

    describe("createEmployee()", () => {
        it("should create a company and add to the list of companies", waitForAsync(() => {
            
            const expectedEmployee = {id: 1, firstName: "test", lastName: "test", company: 1};
            spyOn(employeeService.snackbar, "success").and.callThrough();

            employeeService.createEmployee({id: 1, firstName: "test", lastName: "test", company: 1}).subscribe((result) => {
                expect(result).toEqual(expectedEmployee);
            });

            expect(employeeService.snackbar.success).toHaveBeenCalledWith("Created employee test test");
        }));
    });

    describe("getEmployeeById()", () => {
        it("should get details of company", waitForAsync(() => {
            const expectedUrl = "api/employees/1";
            const expectedCompany = {id: 1, firstName: "test", lastName: "test", company: 1};
            spyOn(employeeService.http, "get").and.returnValue(of(expectedCompany));

            employeeService.getEmployeeById(1).subscribe((result) => {
                expect(result).toEqual(expectedCompany);
            });

            expect(employeeService.http.get).toHaveBeenCalledOnceWith(expectedUrl);
        }));
    });

    describe("deleteEmployeeFromCompany()", () => {
        it("should delete employee from a company", waitForAsync(() => {
            
            const expectedEmployee = {id: 1, firstName: "test", lastName: "test", company: 1};
            spyOn(employeeService.snackbar, "success").and.callThrough();

            employeeService.createEmployee({id: 1, firstName: "test", lastName: "test", company: 1}).subscribe((result) => {
                expect(result).toEqual(expectedEmployee);
            });

            expect(employeeService.snackbar.success).toHaveBeenCalledWith("Created employee test test");
        }));
    });
});
