import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Company} from "../model/company";
import {SnackbarService} from "./snackbar.service";

@Injectable({
    providedIn: "root",
})
export class CompanyService {

    private companiesUrl = "api/companies";
    httpOptions = {
        headers: new HttpHeaders({"Content-Type": "application/json"}),
    };

    constructor(
        private http: HttpClient,
        private snackbar: SnackbarService,
    ) {
    }

    genId(companies: Company[]): number {
        return companies.length > 0 ? Math.max(...companies.map(comp => comp.id)) + 1 : 11;
    }

    getCompanies(): Observable<Company[]> {
        return this.http.get<Company[]>(this.companiesUrl).pipe(
            catchError(this.handleError<Company[]>("getCompanies", [])),
        );
    }

    /** GET company by id. Will 404 if id not found */
    getCompanyById(id: number): Observable<Company> {
        const url = `${this.companiesUrl}/${id}`;
        return this.http.get<Company>(url).pipe(
            map(data => data),
            catchError(this.handleError<Company>(`getCompanies id=${id}`)),
        );
    }

    createCompany(company: Company): Observable<Company> {
        return this.http.post<Company>(this.companiesUrl, company, this.httpOptions).pipe(
            map(data => {
                this.snackbar.success(`Created employee ${data.name}`);
                return data;
            }),
            catchError(this.handleError<Company>("addCompany")),
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
