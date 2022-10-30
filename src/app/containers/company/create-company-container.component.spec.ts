import {TestBed, waitForAsync} from "@angular/core/testing";
import {CreateCompanyContainerComponent} from "./create-company-container.component";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppState} from "../../store/state.model";
import {AddCompany} from "../../store/company/company.actions";
import {DeleteEmployee} from "../../store/employee/employee.actions";

describe("CreateCompanyContainerComponent", () => {
    let createCompanyContainerComponent;
    let store: MockStore<AppState>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [CreateCompanyContainerComponent],
            providers: [
                provideMockStore({
                    initialState: {},
                }),
            ],
        }).compileComponents();
    
        const fixture = TestBed.createComponent(CreateCompanyContainerComponent);
        createCompanyContainerComponent = fixture.componentInstance;
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
            createCompanyContainerComponent.ngOnInit();
            createCompanyContainerComponent.companyList$.subscribe((companies) => 
                expect(companies).toEqual([{id:1, name: "abc"}]));
            createCompanyContainerComponent.employeeList$.subscribe((employees) =>
                expect(employees).toEqual([{id:1, firstName: "test", lastName: "", company: 1}]));
        }));
    });

    describe("getCompanies", () => {
        it("should dispatch action to GetCompanies", () => {
            spyOn(createCompanyContainerComponent.store, "dispatch");
            createCompanyContainerComponent.getCompanies();
            expect(createCompanyContainerComponent.store.dispatch).toHaveBeenCalled();
        });
    });

    describe("createCompany", () => {
        it("should dispatch action to AddCompany", () => {
            spyOn(createCompanyContainerComponent.store, "dispatch");
            const expectedAction = new AddCompany({id: 1, name: "test"});
            createCompanyContainerComponent.createCompany({id: 1, name: "test"});
            expect(createCompanyContainerComponent.store.dispatch).toHaveBeenCalledWith(expectedAction);
        });
    });

    describe("deleteEmployeeFromCompany", () => {
        it("should dispatch action to DeleteEmployee", () => {
            spyOn(createCompanyContainerComponent.store, "dispatch");
            const employeeToDelete = {id: 1, firstName: "test", lastName: "", company: undefined};
            const expectedAction = new DeleteEmployee(employeeToDelete);
            createCompanyContainerComponent.deleteEmployeeFromCompany(employeeToDelete);
            expect(createCompanyContainerComponent.store.dispatch).toHaveBeenCalledWith(expectedAction);
        });
    });
});