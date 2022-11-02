import {TestBed, waitForAsync} from "@angular/core/testing";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import { Company } from "src/app/model/company";
import { Employee } from "src/app/model/employee";
import { UpdateEmployee } from "src/app/store/employee/employee.actions";
import {AppState} from "src/app/store/state.model";
import {LinkEmployeesToCompanyContainerComponent} from "./link-employees-to-company-container.component";

describe("LinkEmployeesToCompanyContainerComponent", () => {
    let linkEmployeesToCompanyContainerComponent;

    let store: MockStore<AppState>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [LinkEmployeesToCompanyContainerComponent],
            providers: [
                provideMockStore({
                    initialState: {},
                }),
            ],
        }).compileComponents();
    
        const fixture = TestBed.createComponent(LinkEmployeesToCompanyContainerComponent);
        linkEmployeesToCompanyContainerComponent = fixture.componentInstance;
        store = TestBed.inject(MockStore);
    });

    describe("ngOnInit", () => {
        it("should define observables", waitForAsync(() => {
            store.setState(
                {
                    companies: [{id: 1, name: "abc"}],
                    employees: [{id: 1, firstName: "test", lastName: "", company: 1}],
                },
            );
            linkEmployeesToCompanyContainerComponent.ngOnInit();
            linkEmployeesToCompanyContainerComponent.companyList$.subscribe((companies) => 
                expect(companies).toEqual([{id:1, name: "abc"}]));
            linkEmployeesToCompanyContainerComponent.employeeList$.subscribe((employees) =>
                expect(employees).toEqual([{id:1, firstName: "test", lastName: "", company: 1}]));
        }));
    });

    describe("updateCompanyToEmployee", () => {
        it("should dispatch action to UpdateCompany", () => {
            spyOn(linkEmployeesToCompanyContainerComponent.store, "dispatch");

            const employeeToUpdate: Employee = {id: 1, firstName: "test", lastName: ""};
            const companyToLink: Company = {id: 1, name: "abc"};
            const expectedAction = new UpdateEmployee(employeeToUpdate, companyToLink);

            linkEmployeesToCompanyContainerComponent.updateCompanyToEmployee({employee: employeeToUpdate, company: companyToLink});
            expect(linkEmployeesToCompanyContainerComponent.store.dispatch).toHaveBeenCalledWith(expectedAction);
        });
    });
});
