import {Injectable} from "@angular/core";
import {InMemoryDbService} from "angular-in-memory-web-api";
import {Employee} from "../model/employee";

@Injectable({
    providedIn: "root",
})
export class DataService implements InMemoryDbService {
    employeeList: Employee[] = [];
    constructor() {}

    createDb() {
        return {
            employees: [
                {
                    "id": 1,
                    "firstName": "Captian",
                    "lastName": "America",
                    "companyId": 1,
                },
                {
                    "id": 2,
                    "firstName": "Iron",
                    "lastName": "Man",
                    "companyId": 2,
                },
            ],
            companies: [
                {
                    "id": 1,
                    "name": "Avengers",
                },
                {
                    "id": 2,
                    "name": "Marvel",
                },
            ],
        };
    }
}