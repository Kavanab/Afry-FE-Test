import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";
import { Observable, of } from "rxjs";
import { Employee } from "../model/employee";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class EmployeeService implements InMemoryDbService{
    private employeeList: Employee[] = [];
    private employeesUrl = "api/employee";

    createDb() {
        this.employeeList = [
            {
                "id": 1,
                "firstName": "Captian",
                "lastName": "America",
                "companyId": 1
            },
            {
                "id": 2,
                "firstName": "Iron",
                "lastName": "Man",
                "companyId": 2
            }
        ];
        return {...this.employeeList};
    }

    constructor(private http: HttpClient) { 
    }

    genId(employees: Employee[]): number {
        return employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 11;
    }

    getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.employeesUrl)
        .pipe(
            catchError(this.handleError<Employee[]>("getEmployees", []))
        );
    }

    /** GET hero by id. Will 404 if id not found */
    getEmployeeById(id: number): Observable<Employee> {
        const url = `${this.employeesUrl}/${id}`;
        return this.http.get<Employee>(url).pipe(
            map(data => data),
            catchError(this.handleError<Employee>(`getEmployee id=${id}`))
        );
    }

    private handleError<T>(operation = "operation", result?: T) {
        return (error: any): Observable<T> => {
      
          console.error(error); 
          console.log(`${operation} failed: ${error.message}`);

          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }
}
