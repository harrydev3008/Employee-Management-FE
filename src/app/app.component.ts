import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from './services/employee.service';
import { Employee } from './model/employee/employee.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'employeeManagement';

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experiences',
    'packages',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _empService: EmployeeService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  openEmployeeFormDialog() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);

    dialogRef.afterClosed().subscribe({
      next: (isAddEmployee) => {
        if (isAddEmployee) this.fetchEmployees();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  fetchEmployees() {
    this._empService.getEmployee().subscribe({
      next: (value: Employee[]) => {
        this.dataSource = new MatTableDataSource(value);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }

  deleteEmployee(employeeId: number) {
    const confirmDelete = confirm(
      'Are you sure you wanna remove this employee?'
    );
    if (confirmDelete) {
      this._empService.deleteEmployee(employeeId).subscribe({
        next: (value) => {
          this.fetchEmployees();
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  editEmployeeFormDialog(employeeData: Employee) {
    this._dialog.open(EmpAddEditComponent, { data: employeeData });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
