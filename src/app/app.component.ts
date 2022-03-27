import { Component, OnInit} from '@angular/core';
import { Table } from './Interfaces/table';
import { TableData1 } from './Interfaces/table-data1';
import { TableData2 } from './Interfaces/table-data2';
import { TableData3 } from './Interfaces/table-data3';
import { TableService } from './Services/table.service';

import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Subject } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit{
    public tables: Table[] = [];
	public table: any = {};
	public table1: TableData1[] = [];
	public table2: TableData2[] = [];
	public table3: TableData3[] = [];
    public selectedValue = 0;
	public dataTable:any = [];
	public tableSelect = 1;

    public removeConfirmationSubject: Subject<boolean> = new Subject<boolean>();
    public itemToRemove: any;
	
	constructor(private tableService: TableService, private formBuilder: FormBuilder) { 
		this.createFormGroup = this.createFormGroup.bind(this);
		this.removeConfirmation = this.removeConfirmation.bind(this);
	}
	
    ngOnInit(): void {
      this.getTables();
    }
	
   getTables(): void {
     this.tableService.getTables()
         .subscribe((tables) => {this.tables = tables; this.selectedValue = 1; this.getDataTable1(1);});
   } 	
   
  public handleFilterChange(value:any): void {
    this.tableSelect = value;
	if (value==1){
		this.getDataTable1(value);
	}
	else if (value==2) {
		this.getDataTable2(value);
	}
	else if (value==3) {
		this.getDataTable3(value);
	}

  }   
 
  getDataTable1(idTable:number): void {
     this.tableService.getData1()
         .subscribe((table1) => {this.dataTable = table1; this.getColumnsTable(idTable);});
   } 	
  
  getDataTable2(idTable:number): void {
     this.tableService.getData2()
         .subscribe((table2) => {this.dataTable = table2;this.getColumnsTable(idTable);});
   } 	

  getDataTable3(idTable:number): void {
     this.tableService.getData3()
         .subscribe((table3) => {this.dataTable = table3;this.getColumnsTable(idTable);});
   } 	
 

  getColumnsTable(idTable:number):void {
     this.tableService.getColumnsTable(idTable)
        .subscribe((table) => {this.table = table;});
  }	  
 
   public createFormGroup(args: any): any {
    let item: any;
	let formGroup:any;
	if(this.tableSelect == 1) {
		item = args.isNew ? new TableData1() : args.dataItem;

		formGroup = this.formBuilder.group({
		  t1c1: item.t1c1,
		  t1c2: item.t1c2,
		  t1c3: item.t1c3,
		  t1c4: item.t1c4
		});
	}
	else if(this.tableSelect == 2){
		item = args.isNew ? new TableData2() : args.dataItem;
		formGroup = this.formBuilder.group({
		  t2c1: item.t2c1,
		  t2c2: item.t2c2,
		  t2c3: item.t2c3,
		  t2c4: item.t2c4,
		  t2c5: item.t2c5
		});
	}
	else if(this.tableSelect == 3){
		item = args.isNew ? new TableData3() : args.dataItem;
		formGroup = this.formBuilder.group({
		  t3c1: item.t3c1,
		  t3c2: item.t3c2,
		  t3c3: item.t3c3
		});
	}
    return formGroup;
  }

  public confirmRemove(shouldRemove: boolean): void {
    this.removeConfirmationSubject.next(shouldRemove);

    this.itemToRemove = null;
  }

  public removeConfirmation(dataItem:any): Subject<boolean> {
    this.itemToRemove = dataItem;

    return this.removeConfirmationSubject;
  }  
  
}