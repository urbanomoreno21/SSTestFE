import { Injectable } from '@angular/core';
import { Table } from '../Interfaces/table';
import { TableData1 } from '../Interfaces/table-data1';
import { TableData2 } from '../Interfaces/table-data2';
import { TableData3 } from '../Interfaces/table-data3';
import { Observable, of, throwError  } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  constructor(private http: HttpClient) { }
  getTables(): Observable<Table[]> {
	  return this.http.get<Table[]>(`http://localhost:3000/tables`);
  }    

  getData1(): Observable<TableData1[]> {
	  return this.http.get<TableData1[]>(`http://localhost:3000/table-data1`);
  }    

  getData2(): Observable<TableData2[]> {
	  return this.http.get<TableData2[]>(`http://localhost:3000/table-data2`);
  }    

  getData3(): Observable<TableData3[]> {
	  return this.http.get<TableData3[]>(`http://localhost:3000/table-data3`);
  }    
  
  getColumnsTable(idTable:number): Observable<Table> {
	  return this.http.get<Table>(`http://localhost:3000/tables/${idTable}`);
  }      
  
}
