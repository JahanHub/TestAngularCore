import { DatePipe, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GridComponent } from '@progress/kendo-angular-grid';
import { SelectableSettings } from '@progress/kendo-angular-treeview';
import { forkJoin } from 'rxjs';
import { DropDown } from 'src/app/core/models/drop-down.model';
import { BaseApiService } from 'src/app/core/services/base-api.service';

@Component({
  selector: 'app-sample-report',
  templateUrl: './sample-report.component.html',
})
export class SampleReportComponent implements OnInit {

  public frmSampleReport : FormGroup;

  public grid: GridComponent;
  public gridData: any[] =[];
  private cd: Date = new Date();
  public mySelection: number[] = [];
  public expenseHeadDropdownData: any[] = [];
  public expenseElementDropdownData: any[] = [];
  public imagePath;
  imgURL: any;
  public message: string;
//   public expenseData: Expense;
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
    this.loadAllExpenseDropdowns();
  }

//   createFrmSampleReport(dataItem: any ={}){
//     this.frmSampleReport = this.fb.group({
//       Id: new FormControl(0),
//       IdExpenseHead: new FormControl(''),
//       IdExpenseElement: new FormControl(''),
//       ExpenseDate: new FormControl(dataItem.ExpenseDate?new Date(formatDate(dataItem.ExpenseDate,'yyyy-MM-dd','en')) :new Date()),
//       PayTo: new FormControl(''),
//       Remarks: new FormControl(''),
//       Amount: new FormControl(''),
//     });
//   }


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
    this.frmSampleReport.patchValue({
      IdExpenseElement: null
    });
    if (item !== null) {
      const IdExpenseHead = item;
        this.apiService.get(`api/common/expenseelements?IdExpenseHead=${IdExpenseHead}`).subscribe((res) => {
          this.expenseElementDropdownData = res[`Data`];
        });;
    }
  }

  public generateReport()
  {
    
  }

}