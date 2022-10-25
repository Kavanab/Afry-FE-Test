import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Employee} from "../model/employee";
import {catchError, map} from "rxjs/operators";
import {SnackbarService} from "./snackbar.service";

@Injectable({providedIn: "root"})
export class EmployeeService {
    private employeesUrl = "api/employees";
    httpOptions = {
        headers: new HttpHeaders({"Content-Type": "application/json"}),
    };

    constructor(
        private http: HttpClient,
        private snackbar: SnackbarService,
    ) {
    }

    genId(employees: Employee[]): number {
        return employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 11;
    }

    getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.employeesUrl).pipe(
            catchError(this.handleError<Employee[]>("getEmployees", [])),
        );
    }

    /** GET hero by id. Will 404 if id not found */
    getEmployeeById(id: number): Observable<Employee> {
        const url = `${this.employeesUrl}/${id}`;
        return this.http.get<Employee>(url).pipe(
            map(data => data),
            catchError(this.handleError<Employee>(`getEmployee id=${id}`)),
        );
    }

    createEmployee(employee: Employee): Observable<Employee> {
        return this.http.post<Employee>(this.employeesUrl, employee, this.httpOptions).pipe(
            map(data => {
                this.snackbar.success(`Created employee ${data.firstName} ${data.lastName}`);
                return data;
            }),
            catchError(this.handleError<Employee>("addEmployee")),
        );
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
