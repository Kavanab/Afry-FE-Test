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
                    "id": 0,
                    "firstName": "demo",
                    "lastName": "",
                    "companyId": 0,
                },
            ],
            companies: [
                {
                    "id": 0,
                    "name": "demo",
                },
            ],
        };
    }
}