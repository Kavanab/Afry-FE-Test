import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Employee} from "../model/employee";
import {catchError, map, tap} from "rxjs/operators";
import {SnackbarService} from "./snackbar.service";
import {LocalStorageService} from "./local-storage.service";

@Injectable({providedIn: "root"})
export class EmployeeService {
    private employeesUrl = "api/employees";
    httpOptions = {
        headers: new HttpHeaders({"Content-Type": "application/json"}),
    };

    constructor(
        private http: HttpClient,
        private snackbar: SnackbarService,
        private localService: LocalStorageService,
    ) {
    }

    getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.employeesUrl).pipe(
            tap(data => {
                if (!this.localService.getData("employeeList")) {
                    this.localService.saveData("employeeList", JSON.stringify(data));
                }
                return of(data);
            }),
            catchError(this.handleError<Employee[]>("getEmployees", [])),
        );
    }

    /** GET employee by id. Will 404 if id not found */
    getEmployeeById(id: number): Observable<Employee> {
        const url = `${this.employeesUrl}/${id}`;
        return this.http.get<Employee>(url).pipe(
            map(data => data),
            catchError(this.handleError<Employee>(`getEmployee id=${id}`)),
        );
    }

    createEmployee(employee: Employee): Observable<Employee> {
        const name = employee.lastName ? `${employee.firstName} ${employee.lastName}` : `${employee.firstName}`;
        this.snackbar.success(`Created employee ${name}`);
        const savedData: Employee[] = JSON.parse(this.localService.getData("employeeList"));
        savedData.push(employee);
        this.localService.saveData("employeeList", JSON.stringify(savedData));
        return of(employee);
    }

    deleteEmployeeFromCompany(employee: Employee): Observable<Employee> {
        const name = employee.lastName ? `${employee.firstName} ${employee.lastName}` : `${employee.firstName}`;
        this.snackbar.success(`Deleted employee ${name} successfully`);
        let savedData: Employee[] = JSON.parse(this.localService.getData("employeeList"));
        Object.assign(savedData, savedData.map(el => el.id === employee.id ? employee : el));
            
        this.localService.saveData("employeeList", JSON.stringify(savedData));
        return of(employee);
    }

    private handleError<T>(operation = "operation", result?: T) {
        return (error: any): Observable<T> => {
            console.log(`${operation} failed: ${error}`);
            this.snackbar.error(`${operation} failed: ${error.message}`);
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
