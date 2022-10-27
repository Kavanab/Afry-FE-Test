import {Employee} from "../model/employee";

export interface AppState {
    readonly employees: Array<Employee>;
}