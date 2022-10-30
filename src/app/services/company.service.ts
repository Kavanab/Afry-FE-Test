import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {Company} from "../model/company";
import {LocalStorageService} from "./local-storage.service";
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
        private localService: LocalStorageService,
    ) {
    }

    getCompanies(): Observable<Company[]> {
        return this.http.get<Company[]>(this.companiesUrl).pipe(
            tap(data => {
                if (!this.localService.getData("companiesList")) {
                    this.localService.saveData("companiesList", JSON.stringify(data));
                }
            }),
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
        this.snackbar.success(`Created company ${company.name}`);
        const savedData: Company[] = JSON.parse(this.localService.getData("companiesList"));
        savedData.push(company);
        this.localService.saveData("companiesList", JSON.stringify(savedData));
        return of(company);
           
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
