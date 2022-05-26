import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddEvent, CancelEvent, EditEvent, GridComponent, RemoveEvent, SaveEvent } from '@progress/kendo-angular-grid';
import { DatePipe, formatDate } from '@angular/common';
import { forkJoin } from 'rxjs';
import { ListBarProperties } from 'src/app/core/models/list-bar.model';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  //styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  private datepipe: DatePipe;
  public frmSales: FormGroup;
  public formGroup: FormGroup;
  public grid: GridComponent;
  public gridData: any[] = [];
  private cd: Date = new Date();
  public isGridEditMode = false;
  editedRowIndex: any;
  public itemDropdownData: any[] = [];
  public customerDropdownData: any[] = [];
  public salesList: any[] = [];
  public listProperties: ListBarProperties = new ListBarProperties();
  salesListDetail: any[] = [];
  public sales:any;

  constructor(
    private fb: FormBuilder, 
    private httpClient: HttpClient,
    //private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    this.initiateListbarProperties()
    this.createFrmSales();
    this.loadGridDataSource();
    this.loadDropdowns();
    this.loadSalesList();
  }

  initiateListbarProperties(){
    this.listProperties = new ListBarProperties();
    this.listProperties.Header='Id';
    this.listProperties.Others = ['SalesDate','CustomerId']
  }

  public loadGridDataSource(salesDetailInfo: any = []) {
    if (salesDetailInfo === null || salesDetailInfo === undefined || salesDetailInfo.length === 0) {
      salesDetailInfo = [];
    }
    this.gridData = salesDetailInfo;
  }

  createFrmSales(dataItem: any ={}) {
    console.log(dataItem);
    this.frmSales = this.fb.group({
      Id: new FormControl(dataItem.Id ?? 0),
      SalesId: new FormControl(1),
      SalesDate: new FormControl(dataItem.SalesDate?new Date(formatDate(dataItem.SalesDate,'yyyy-MM-dd','en')) :new Date()),
      CustomerId: new FormControl(dataItem.CustomerId?? 0)
    });
  }

  getSalesDetailsForm() {
    return this.frmSales.get('SalesDetails') as FormArray;
  }

  save() {
    const sales = this.frmSales.getRawValue();
    sales.SaleDetails = this.gridData;
    console.log(sales);
    if (sales.Id && sales.Id > 0) {
      this.httpClient.put('http://localhost:5138/api/Sales/' + sales.Id, sales).subscribe(
        (res) => {
          this.clear();
        },
        (err) => {
          console.log("Can't Saved!");
        },
        () => {

        }
      );
    } else {
      this.httpClient.post('http://localhost:5138/api/Sales', sales).subscribe(
        (res) => {
          console.log(res);
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

  getSales() {
    this.httpClient.get('http://localhost:5138/api/Sales').subscribe(
      (res) => {
        // this.gridData = res as any[];
        console.log(res);
      },
      (err) => {
        console.log("Data Get Error!");
      },
      () => {

      }
    )
  }

  public createSalesDetailsFormGroup(dataItem: any = {}): FormGroup {
    return this.fb.group({
      Id: new FormControl(dataItem.Id ?? 0),
      ItemCode: new FormControl(dataItem.ItemCode, Validators.required),
      ItemName: new FormControl(dataItem.ItemName, Validators.required),
      SalesPrice: new FormControl(dataItem.SalesPrice),
      Qty: new FormControl(dataItem.Qty),
    });
  }

  clear() {
    this.createFrmSales();
    this.formGroup = this.createSalesDetailsFormGroup();
    this.gridData = [];
    this.loadSalesList();
    this.getSales();
  }

  public addHandler({ sender }: AddEvent): void {
    this.closeEditor(sender);
    this.formGroup = this.createSalesDetailsFormGroup();
    sender.addRow(this.formGroup);
  }

  public editHandler({ sender, rowIndex, dataItem }: EditEvent): void {
    this.closeEditor(sender);
    console.log(dataItem);
    const index = this.itemDropdownData.filter(i=> i.ItemCode === dataItem.ItemCode);
    const e= index[0];
    console.log(e);
    dataItem.ItemName = e.ItemName;
    this.formGroup = this.createSalesDetailsFormGroup(dataItem);

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler({ sender, rowIndex }: CancelEvent): void {
    this.closeEditor(sender, rowIndex);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent): void {
    const frmValue = formGroup.value;
    sender.closeRow(rowIndex);
    if (isNew) {
      this.gridData.push(frmValue);
    } else {
      this.gridData[rowIndex] = frmValue;
    }
    this.gridData = this.gridData;
  }

  public removeHandler({ dataItem, rowIndex }: RemoveEvent): void {
    console.log(dataItem);
    if (confirm('Are You Sure?')) {
      // const rowIndex = this.gridData.findIndex(dataItem);
      this.gridData.splice(rowIndex, 1);
      this.gridData = this.gridData;
    }

  }

  private closeEditor(
    grid: GridComponent,
    rowIndex = this.editedRowIndex
  ): void {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

  getCustomer() {
    this.httpClient.get('http://localhost:5138/api/common/customerdropdown').subscribe(
      (res) => {
        // this.gridData = res as any[];
        console.log(res);
      },
      (err) => {
        console.log("Data Get Error!");
      },
      () => {

      }
    )
  }

  loadDropdowns() {
    forkJoin([this.loadCustomers(), this.loadItems()]).subscribe(
      ([res1, res2]) => {
        this.customerDropdownData = res1[`Data`];
        this.itemDropdownData = res2 as any[];
      },
      (err) => {

      }
    )
  }

  loadCustomers() {
    return this.httpClient.get('http://localhost:5138/api/common/customers');
  }

  loadItems() {
    return this.httpClient.get('http://localhost:5138/api/items');
  }

  onItemDropDownChange(ev){
    const index = this.itemDropdownData.filter(i=> i.ItemCode === ev);
    const e= index[0];
    console.log(e);
    this.formGroup.patchValue({
      ItemName: e.ItemName,
      SalesPrice: e.SalesPrice,
      ItemCode: e.ItemCode
    });
  }

//   private loadSales(): void {
//     this.baseDataService
//       .callServer(
//         'GET',
//         'http://localhost:5138/api/Sales'
//       )
//       .subscribe((res) => {
//         // tslint:disable-next-line: no-string-literal

//         this.pur = res[`data`];
//       });

// }
loadSalesList() {
  return this.httpClient.get('http://localhost:5138/api/Sales').subscribe(
    (res)=>{
      this.salesList = res as any[];
      console.log(this.salesList);
    },
    (err)=>{
      
    },
    ()=>{

    }
  )
}

public itemSelected(item: any) {
  console.log(item);
  return this.httpClient.get('http://localhost:5138/api/Sales/' + item.Id).subscribe(
    (res)=>{
      this.sales = res;
      console.log(res);
      this.mapItem(this.sales);
    },
    (err)=>{
      //this.toastr.error('Error Occurred : ' + err, 'Error');
    },
    ()=>{

    }
  )
}
public mapItem(item: any) {

  this.gridData = item.SaleDetails;
  this.gridData.map((v,i)=>{
    const index = this.itemDropdownData.filter(i=> i.ItemCode === v.ItemCode);
    const e= index[0];
    console.log(e);
    v.ItemName = e.ItemName;
  });
  this.gridData = this.gridData;
  this.createFrmSales(item);
}

createSalesFormGroup(): FormGroup {
  return this.fb.group({
    id:  new FormControl(null),
    SalesDate:  new FormControl(null),
    CustomerId: new FormControl(null),
  });
}

// public itemSelected(item: ItemMasterDto) {
//   this.spinnerService.show();
//   this.baseDataService
//   .callServer('GET',
//   'api/shareddata/itemmaster/details?idClient=' +
//     this.clientService.getIdClient() +
//     '&id=' + item.id,
//     'v1').subscribe(
//         (res) => {
//           const itemMaster = res[`data`] as ItemMasterDto;
//           this.mapItem(itemMaster);
//           this.spinnerService.hide();
//         },
//         (err) => {
//           this.toastr.error('Error Occurred : ' + err, 'Error');
//           this.spinnerService.hide();
//         }
//     );
// }


}
