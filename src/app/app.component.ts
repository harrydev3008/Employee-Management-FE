import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employeeManagement';

  displayedColumns: string[] = ['ID', 'First Name', 'Last Name', 'Email', 'DoB', 'Gender', 'Education', 'Company', 'Experiences', 'Package'];

  constructor(private _dialog: MatDialog) {}

  openEmployeeFormDialog() {
    this._dialog.open(EmpAddEditComponent)
  }
}
