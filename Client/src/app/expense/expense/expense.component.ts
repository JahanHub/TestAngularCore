import { DatePipe, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GridComponent } from '@progress/kendo-angular-grid';
import { SelectableSettings } from '@progress/kendo-angular-treeview';
import { forkJoin } from 'rxjs';
import { DropDown } from 'src/app/core/models/drop-down.model';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { Expense } from 'src/app/models/expense';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
})
export class ExpenseComponent implements OnInit {

  public frmExpense : FormGroup;

  public grid: GridComponent;
  public gridData: any[] =[];
  private cd: Date = new Date();
  public mySelection: number[] = [];
  public expenseHeadDropdownData: any[] = [];
  public expenseElementDropdownData: any[] = [];
  public imagePath;
  imgURL: any;
  public message: string;
  public expenseData: Expense;
  public selectedFile: File;

  public selectedFileString: string;
  public selectedFileName: string;
  public defaultItem: DropDown = new DropDown();
 idExpenseElement: number;
 public clearButtonText: string = "Clear";

  public selectableSettings: SelectableSettings = {
    enabled: false
  };

  constructor(
    private fb:FormBuilder,
    private httpClient: HttpClient,
    private apiService: BaseApiService
    ) { }

  ngOnInit(): void {
    this.clear();
    this.loadAllExpenseDropdowns();
  }

  createFrmExpense(dataItem: any ={}){
    this.frmExpense = this.fb.group({
      Id: new FormControl(0),
      IdExpenseHead: new FormControl(''),
      IdExpenseElement: new FormControl(''),
      ExpenseDate: new FormControl(dataItem.ExpenseDate?new Date(formatDate(dataItem.ExpenseDate,'yyyy-MM-dd','en')) :new Date()),
      PayTo: new FormControl(''),
      Remarks: new FormControl(''),
      Amount: new FormControl(''),
    });
  }
  save(){
    const expense = this.frmExpense.getRawValue();

    // let fd = new FormData();

    // fd.append("Id", expense.Id.toString());
    // fd.append("IdExpenseHead", expense.IdExpenseHead.toString());
    // fd.append("IdExpenseElement", expense.IdExpenseElement.toString());
    // fd.append("ExpenseDate", expense.ExpenseDate.toDateString());
    // fd.append("PayTo", expense.PayTo.toString());
    // fd.append("Remarks", expense.Remarks.toString());
    // fd.append("Amount", expense.Amount.toString());
    
    if(expense.Id && expense.Id > 0){
      this.httpClient.put('http://localhost:5138/api/Expense/'+expense.Id ,expense).subscribe(
        (res)=>{
          this.clear();
        },
        (err) => {
          console.log("Can't Saved!");
        },
        () => {

        }
      );
    } else {
      this.httpClient.post('http://localhost:5138/api/Expense',expense).subscribe(
        (res)=>{
          this.clear();
        },
        (err) => {
          console.log("Can't Saved!");
        },
        () => {

        }
      );
    }

  }

  getExpense(){
    this.httpClient.get('http://localhost:5138/api/Expense').subscribe(
      (res)=>{
        this.gridData = res as any[];
        this.gridData.map(x=>{
          x.ExpenseDate = formatDate(x.ExpenseDate,'dd MMM, yyyy','en');
        });
        this.gridData= this.gridData;
      },
      (err) => {
        console.log("Data Get Error!");
      },
      () => {

      }
    )
  }

  onRowEdit(expense: any){
    this.loadElementByHead(expense.IdExpenseHead);
    
    this.frmExpense.patchValue({
      Id:expense.Id,
      IdExpenseHead:expense.IdExpenseHead,
      IdExpenseElement:expense.IdExpenseElement,
      ExpenseDate: new Date(formatDate(expense.ExpenseDate,'yyyy-MM-dd','en')),
      PayTo: expense.PayTo,
      Remarks: expense.Remarks,
      Amount: expense.Amount,
    })
  }


  onRowDelete(expense: any){
    if(confirm('Are You Sure?')){
      this.httpClient.delete('http://localhost:5138/api/Expense/'+ expense.Id).subscribe(
      (res)=>{
        this.clear();
      },
      (err) => {
        console.log("Data Get Error!");
      },
      () => {

      }
    )
    }
  }

  clear() {
    this.createFrmExpense();
    this.getExpense();
  }

  getAverage(columnName){
   const total = this.gridData.reduce((previous,current)=> previous + current[columnName], 0);
   const average =total/this.gridData.length;
   return average;
  }

  loadExpenseHead() {
    return this.apiService.get('api/common/expenseheads');
  }
  loadExpenseElement() {
    return this.apiService.get('api/common/expenseelements');
  }

  loadAllExpenseDropdowns() {
    forkJoin([this.loadExpenseElement(), this.loadExpenseHead()]).subscribe(
      ([res1, res2]) => {
        this.expenseElementDropdownData = res1[`Data`];
        this.expenseHeadDropdownData = res2[`Data`] as any[];
        console.log('res2: ',res2);
      },
      (err) => {

      }
    )
  }

  public loadElementByHead(item: any) {
    this.frmExpense.patchValue({
      IdExpenseElement: null
    });
    if (item !== null) {
      const IdExpenseHead = item;
        this.apiService.get(`api/common/expenseelements?IdExpenseHead=${IdExpenseHead}`).subscribe((res) => {
          this.expenseElementDropdownData = res[`Data`];
        });;
    }
  }

}