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
                    "firstName": "Tony",
                    "lastName": "Stark",
                    "company": 1,
                },
                {
                    "id": 2,
                    "firstName": "Bruce",
                    "lastName": "Wayne",
                    "company": 2,
                },
            ],
            companies: [
                {
                    "id": 1,
                    "name": "Marvel",
                },
                {
                    "id": 2,
                    "name": "DC",
                },
            ],
        };
    }
}