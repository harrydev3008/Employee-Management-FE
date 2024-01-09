import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent {

  employeeForm: FormGroup;

  educations = [
    "Diploma",
    "Intermediate",
    "Graduate",
    "Post Graduate",
  ];

  constructor(
      private _fb: FormBuilder,
      private _employeeService: EmployeeService,
      private _dialogRef: DialogRef<EmpAddEditComponent>
    ) {
    this.employeeForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }

  onFormSubmit() {
    if(this.employeeForm.valid) {
      // this._dialogRef.close();
      // console.log(this.employeeForm.value);
      // this._employeeService.addEmployee(this.employeeForm.value).subscribe({
      //   next: (value: any) => {
      //     this._dialogRef.close();
      //   },
      //   error: (error: any) => {

      //   }
      // })
    }
  }
}
