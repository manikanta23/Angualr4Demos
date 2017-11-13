import { Component, OnInit } from '@angular/core';
import {EmployeeServiceService} from '../employee-service.service';
import { IEmployee} from '../IEmployee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  providers:[]
})
export class EmployeeListComponent implements OnInit {
  employees: IEmployee[];

  employee:IEmployee =   {code:"test1", name: "test1", gender: "male",    annualSalary: 123,  dateOfBirth: "29-10-1988"}

  statusMessage: string = 'Loading data. Please wait...';
  
  selectedEmployeeCountRadioButton: string = 'All';

  ngOnInit() {
   // this.employees = this._employeeService.getEmployees();
  
       this._employeeService.getEmployees()
                        .subscribe(employeeData => this.employees = employeeData,
                        error =>{
                            console.error(error);
                            this.statusMessage = 'Problem with the service. Please try again after sometime';
                        });

       this._employeeService.insertEmployee(this.employee).subscribe(employeeData => this.employee = employeeData,
        error =>{
            console.error(error);
            this.statusMessage = 'Problem with the service. Please try again after sometime';
        });
   }



  constructor(private _employeeService:EmployeeServiceService) {
   }

//    getEmployees():void {
//     this.employees = [
//       {
//           code: 'emp101', name: 'Tom', gender: 'Male',
//           annualSalary: 5500, dateOfBirth: '25/6/1988'
//       },
//       {
//           code: 'emp102', name: 'Alex', gender: 'Male',
//           annualSalary: 5700.95, dateOfBirth: '9/6/1982'
//       },
//       {
//           code: 'emp103', name: 'Mike', gender: 'Male',
//           annualSalary: 5900, dateOfBirth: '12/8/1979'
//       },
//       {
//           code: 'emp104', name: 'Mary', gender: 'Female',
//           annualSalary: 6500.826, dateOfBirth: '14/10/1980'
//       },
//       {
//         code: 'emp105', name: 'Nancy', gender: 'Female',
//         annualSalary: 6700.826, dateOfBirth: '15/12/1982'
//     },];
//   }

  getTotalEmployeesCount(): number {
      return this.employees.length;
  }

  getMaleEmployeesCount(): number {
      return this.employees.filter(e => e.gender === 'Male').length;
  }

  getFemaleEmployeesCount(): number {
      return this.employees.filter(e => e.gender === 'Female').length;
  }

  trackByEmpCode(index:number,employee:any):string{
    return employee.code;
  }

  onEmployeeCountRadioButtonChange(selectedRadioButtonValue: string): void {
    this.selectedEmployeeCountRadioButton = selectedRadioButtonValue;
}
 

  

 
}
