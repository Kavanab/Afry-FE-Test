# EmployeeMapping

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.6.
# Installation. 
```
$ git clone https://github.com/Kavanab/Afry-FE-Test.git
$ cd <path to Afry-FE-Test>
$ npm install
$ npm run start
```
## Technologies
* Angular - 14.2.6
* LocalStorage :  _to save Employee and Company JSON data (encrypted)_
* Angular Material 
* NgRx - 14.3.2 : _for store management_

## Project Deatils
* **View 1**: Create an Employee 
    * Allows to create an Employee.
    * Link a Company to the Employee and once Employee is created visible in View 2.
    * If no Company is attached, Employee can be viewed and linked in View 3.
* **View 2**: Company and Employee Management
    * Allows to create a Company.
    * List all Employees created in View 1 and linked to a Company.
    * Filter Employees based on Company.
    * Delete an Employee, which unlinks from a company and can be viewed in View 3.
* **View 3**: Unliked Employees
    * Lists all Employees who are not linked to any Companies.
    * Link any Company created in View 2 to each Employee, once they are linked it can be viewed in View 2.

__Note__: `_Sample data (2 Employees and 2 Companies) are created initially._`
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will take you to View 2 - to create an Employee/User. `http://localhost:4200/employee`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
