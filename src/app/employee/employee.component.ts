import { Component, OnInit } from '@angular/core';
import {IEmployee} from '../IEmployee';

import { ActivatedRoute } from '@angular/router';
import { EmployeeServiceService } from '../employee-service.service';
import { Router} from '@angular/router';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employee: IEmployee;
  statusMessage: string = 'Loading data. Please wait...';



  toggleDetails(){
   // this.showdetails = !this.showdetails;
  }

  
  constructor(private _employeeService: EmployeeServiceService, private _activatedRoute: ActivatedRoute, private _router:Router) { }

  ngOnInit() {
    let empCode: string = this._activatedRoute.snapshot.params['code'];
    this._employeeService.getEmployeeByCode(empCode)
        .subscribe((employeeData) => {
            if (employeeData == null) {
                this.statusMessage =
                    'Employee with the specified Employee Code does not exist';
            }
            else {
                this.employee = employeeData;
            }
        },
        (error) => {
            this.statusMessage =
                'Problem with the service. Please try again after sometime';
            console.error(error);
        });
}

onBackButtonClick():void{
  this._router.navigate(['/employees']);
    }

}
