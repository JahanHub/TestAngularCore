import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GridComponent } from '@progress/kendo-angular-grid';
import { SelectableSettings } from '@progress/kendo-angular-treeview';
import { Expense } from 'src/app/models/expense';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
})
export class ExpenseComponent implements OnInit {

  public frmExpense : FormGroup;

  public grid: GridComponent;
  public gridData: any[] =[];
  public mySelection: number[] = [];
  public imagePath;
  imgURL: any;
  public message: string;
  public expenseData: Expense;
  public selectedFile: File;

  public selectedFileString: string;
  public selectedFileName: string;

  public selectableSettings: SelectableSettings = {
    enabled: false
  };

  constructor(private fb:FormBuilder,private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.clear();
  }

  createfrmExpense(){
    this.frmExpense = this.fb.group({
      ExId: new FormControl(0),
      IdExpenseHead: new FormControl(''),
      IdExpenseElement: new FormControl(''),
      ExpenseDate: new FormControl(''),
      PayTo: new FormControl(''),
      Remarks: new FormControl(''),
      Amount: new FormControl(''),
    });
  }
  save(){
    const expense = this.frmExpense.getRawValue();

    let fd = new FormData();

    fd.append("ExId", expense.ExId.toString());
    fd.append("IdExpenseHead", expense.IdExpenseHead.toString());
    fd.append("IdExpenseElement", expense.IdExpenseElement.toString());
    fd.append("ExpenseDate", expense.ExpenseDate.toString());
    fd.append("PayTo", expense.PayTo.toString());
    fd.append("Remarks", expense.Remarks.toString());
    fd.append("Amount", expense.Amount.toString());
    
    if(expense.ExId && expense.ExId > 0){
      this.httpClient.put('http://localhost:5138/api/Expense/'+expense.ExId ,fd).subscribe(
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
      this.httpClient.post('http://localhost:5138/api/Expense',fd).subscribe(
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
      },
      (err) => {
        console.log("Data Get Error!");
      },
      () => {

      }
    )
  }

  onRowEdit(expense: any){
    this.frmExpense.patchValue({
      ExId:expense.ExId,
      IdExpenseHead:expense.IdExpenseHead,
      IdExpenseElement:expense.IdExpenseElement,
      ExpenseDate: expense.ExpenseDate,
      PayTo: expense.PayTo,
      Remarks: expense.Remarks,
      Amount: expense.Amount,
    })
  }


  onRowDelete(expense: any){
    if(confirm('Are You Sure?')){
      this.httpClient.delete('http://localhost:5138/api/Expense/'+ expense.ExId).subscribe(
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
    this.createfrmExpense();
    this.getExpense();
  }

  getAverage(columnName){
   const total = this.gridData.reduce((previous,current)=> previous + current[columnName], 0);
   const average =total/this.gridData.length;
   return average;
  }
}