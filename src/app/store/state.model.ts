import {Company} from "../model/company";
import {Employee} from "../model/employee";

export interface AppState {
    readonly employees: Array<Employee>;
    readonly companies: Array<Company>;
}