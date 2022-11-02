import {TestBed, inject, waitForAsync} from "@angular/core/testing";
import {of} from "rxjs";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CompanyService} from "./company.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe("CompanyService", () => {
    let companyService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatSnackBarModule, BrowserAnimationsModule],
            providers: [CompanyService],
        });
       
    });

    beforeEach(inject([CompanyService], (_service: CompanyService) => {
        companyService = _service;
    }));

    describe("getCompanies()", () => {
        it("should get list of companies", waitForAsync(() => {
            const expectedUrl = "api/companies";
            const expectedCompanies = [{id: 1, name: "test"}];
            spyOn(companyService.http, "get").and.returnValue(of(expectedCompanies));

            companyService.getCompanies().subscribe((result) => {
                expect(result).toEqual(expectedCompanies);
            });

            expect(companyService.http.get).toHaveBeenCalledOnceWith(expectedUrl);
        }));
    });

    describe("createCompany()", () => {
        it("should create a company and add to the list of companies", waitForAsync(() => {
            
            const expectedCompany = {id: 1, name: "test"};
            spyOn(companyService.snackbar, "success").and.callThrough();

            companyService.createCompany({id: 1, name: "test"}).subscribe((result) => {
                expect(result).toEqual(expectedCompany);
            });

            expect(companyService.snackbar.success).toHaveBeenCalledWith("Created company test");
        }));
    });

    describe("getCompanyById()", () => {
        it("should get details of company", waitForAsync(() => {
            const expectedUrl = "api/companies/1";
            const expectedCompany = {id: 1, name: "test"};
            spyOn(companyService.http, "get").and.returnValue(of(expectedCompany));

            companyService.getCompanyById(1).subscribe((result) => {
                expect(result).toEqual(expectedCompany);
            });

            expect(companyService.http.get).toHaveBeenCalledOnceWith(expectedUrl);
        }));
    });


    describe("deleteEmployeeFromCompany()", () => {
        it("should delete employee from a company", waitForAsync(() => {
            
            const expectedEmployee = {id: 1, firstName: "test", lastName: "test", company: 1};
            spyOn(companyService.snackbar, "success").and.callThrough();

            companyService.deleteEmployeeFromCompany({id: 1, firstName: "test", lastName: "test", company: 1}).subscribe((result) => {
                expect(result).toEqual(expectedEmployee);
            });

            expect(companyService.snackbar.success).toHaveBeenCalledWith("Deleted employee test test successfully");
        }));
    });
});
