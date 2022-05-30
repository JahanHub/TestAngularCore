import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddEvent, CancelEvent, EditEvent, GridComponent, RemoveEvent, SaveEvent } from '@progress/kendo-angular-grid';
import { DatePipe, formatDate } from '@angular/common';
import { forkJoin } from 'rxjs';
import { ListBarProperties } from 'src/app/core/models/list-bar.model';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { DropDown } from 'src/app/core/models/drop-down.model';

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
  public listTitle = '';

  public defaultItem: DropDown = new DropDown();

  constructor(
    private fb: FormBuilder, 
    private apiService: BaseApiService,
    //private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    
    this.listTitle = "Sales List";
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
    if (sales.Id && sales.Id > 0) {
      this.apiService.put('api/Sales/' + sales.Id, sales).subscribe(
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
      this.apiService.post('api/Sales', sales).subscribe(
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

  public delete(item) {
    if (confirm('Are you sure to delete? Item: ' + item.Id)) {
      return this.apiService.delete('api/Sales/' + item.Id).subscribe(
        (res)=>{
          this.frmSales.reset();
          this.clear();
        },
        (err)=>{
          //this.toastr.error('Error Occurred : ' + err, 'Error');
        },
        ()=>{
    
        }
      )
    }
  }

  getSales() {
    this.apiService.get('api/Sales').subscribe(
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
      Qty: new FormControl(dataItem.Qty ?? 0, Validators.required),
      Amount: new FormControl(dataItem.Amount ?? 0),
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
    const index = this.itemDropdownData.filter(i=> i.ItemCode === dataItem.ItemCode);
    const e= index[0];
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
    const duplicateData = this.gridData.filter(i=> i.ItemCode == frmValue.ItemCode);
    if (duplicateData.length > 0) {
      alert('Duplicate Found!')
      return;
    }
    frmValue.Amount = frmValue.SalesPrice * frmValue.Qty;

    sender.closeRow(rowIndex);
    if (isNew) {
      this.gridData.push(frmValue);
    } else {
      this.gridData[rowIndex] = frmValue;
    }
    this.gridData = this.gridData;
  }

  public removeHandler({ dataItem, rowIndex }: RemoveEvent): void {
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
    this.apiService.get('api/common/customerdropdown').subscribe(
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
    return this.apiService.get('api/common/customers');
  }

  loadItems() {
    return this.apiService.get('api/items');
  }

  onItemDropDownChange(ev){
    const index = this.itemDropdownData.filter(i=> i.ItemCode === ev);
    const e= index[0];
    this.formGroup.patchValue({
      ItemCode: e.ItemCode,
      ItemName: e.ItemName,
      SalesPrice: e.SalesPrice,
      Qty: e.Qty
    });
  }

loadSalesList() {
  return this.apiService.get('api/Sales').subscribe(
    (res)=>{
      this.salesList = res as any[];
      // this.salesList.map((v,i)=>{
      // });
    },
    (err)=>{
      
    },
    ()=>{

    }
  )
}

public itemSelected(item: any) {
  return this.apiService.get('api/Sales/' + item.Id).subscribe(
    (res)=>{
      this.sales = res;
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
    v.ItemName = e.ItemName;
    v.Amount = (v.Qty * v.SalesPrice);
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

public totalAmountCalculation(item: any, rowIndex: number) {
    if (item !== null) {
      const qty = this.formGroup.get('Qty').value;
      const price = this.formGroup.get('SalesPrice').value;
      const totalAmount = (qty*price);
      item.Amount = totalAmount;
      this.gridData[rowIndex] = item;
      this.gridData = this.gridData;
    }
  }

  getFooterQtySum(column) {
    // let sum = 0;
    // this.formGroup.controls.forEach((ele) => {
    //   sum += ele.get(column).value;
    // });

    const sum = this.gridData.reduce((pre, cur) => pre += (+cur[column]), 0);
    return isNaN(sum) ? 0 : sum;

}

}
