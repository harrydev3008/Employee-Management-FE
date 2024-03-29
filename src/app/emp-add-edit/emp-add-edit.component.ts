import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../model/employee/employee.module';
import { SnackbarService } from '../core/snackbar.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css'],
})
export class EmpAddEditComponent implements OnInit {
  employeeForm: FormGroup;

  educations = ['Diploma', 'Intermediate', 'Graduate', 'Post Graduate'];

  constructor(
    private _fb: FormBuilder,
    private _employeeService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    private _snackBarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public employeeData: Employee
  ) {
    this.employeeForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experiences: '',
      packages: '',
    });
  }

  ngOnInit(): void {
    this.employeeForm.patchValue(this.employeeData);
  }

  onFormSubmit() {
    if (this.employeeForm.valid) {
      if (this.employeeData) {
        Object.assign(this.employeeData, this.employeeForm.value);
        this.updateEmployee(this.employeeData);
      } else {
        this.addEmployee(this.employeeForm.value);
      }
    }
  }

  addEmployee(data: Employee) {
    this._employeeService.addEmployee(this.employeeForm.value).subscribe({
      next: (value: any) => {
        this._dialogRef.close(true);
        this._snackBarService.openSnackBar(
          'New Employee Added Successfully!',
          'Done'
        );
      },
      error: (error: any) => {
        this._snackBarService.openSnackBar(
          `Error: ${error.error.error_message}`,
          'Done'
        );
      },
    });
  }

  updateEmployee(data: Employee) {
    this._employeeService.updateEmployee(data).subscribe({
      next: (value: any) => {
        this._dialogRef.close(true);
        this._snackBarService.openSnackBar(
          'Employee Updated Successfully!',
          'Done'
        );
      },
      error: (error: any) => {
        this._dialogRef.close();
        this._snackBarService.openSnackBar(`Error: ${error}`, 'Done');
      },
    });
  }
}
