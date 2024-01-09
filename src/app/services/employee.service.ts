import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private _baseUrl:string = "http://localhost:8001/employees";

  constructor(private _http: HttpClient) { }

  addEmployee(data: any): Observable<any> {
    return this._http.post(this._baseUrl, data);
  }

  updateEmployee(data: any): Observable<any> {
    return this._http.put(this._baseUrl, data)
  }

  deleteEmployee(data: any): Observable<any> {
    return this._http.delete(this._baseUrl, data);
  }

  getEmployee(): Observable<any> {
    return this._http.get(this._baseUrl);
  }
}
