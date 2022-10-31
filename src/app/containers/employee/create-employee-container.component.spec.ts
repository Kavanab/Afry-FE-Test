import {TestBed, waitForAsync} from "@angular/core/testing";
import {CreateEmployeeContainerComponent} from "./create-employee-container.component";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppState} from "../../store/state.model";
import {AddEmployee} from "src/app/store/employee/employee.actions";

describe("CreateEmployeeContainerComponent", () => {
    let createEmployeeContainerComponent;
    let store: MockStore<AppState>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [CreateEmployeeContainerComponent],
            providers: [
                provideMockStore({
                    initialState: {

                    },
                }),
            ],
        }).compileComponents();
    
        const fixture = TestBed.createComponent(CreateEmployeeContainerComponent);
        createEmployeeContainerComponent = fixture.componentInstance;
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
            createEmployeeContainerComponent.ngOnInit();
            createEmployeeContainerComponent.companyList$.subscribe((companies) => 
                expect(companies).toEqual([{id:1, name: "abc"}]));
            createEmployeeContainerComponent.employeeList$.subscribe((employees) => 
                expect(employees).toEqual([{id:1, firstName: "test", lastName: "", company: 1}]));
        }));
    });

    describe("getEmployees", () => {
        it("should dispatch action to GetEmployees", () => {
            spyOn(createEmployeeContainerComponent.store, "dispatch");
            createEmployeeContainerComponent.getEmployees();
            expect(createEmployeeContainerComponent.store.dispatch).toHaveBeenCalled();
        });
    });

    describe("createEmployee", () => {
        it("should dispatch action to AddEmployee", () => {
            spyOn(createEmployeeContainerComponent.store, "dispatch");
            const employeeData = {id: 1, firstName: "test", lastName: "", company: 1};
            const expectedAction = new AddEmployee(employeeData);
            createEmployeeContainerComponent.createEmployee(employeeData);
            expect(createEmployeeContainerComponent.store.dispatch).toHaveBeenCalledWith(expectedAction);
        });
    });
});