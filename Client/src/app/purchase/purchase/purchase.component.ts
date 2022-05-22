import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddEvent, CancelEvent, EditEvent, GridComponent, RemoveEvent, SaveEvent } from '@progress/kendo-angular-grid';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  //styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  private datepipe: DatePipe;
  public frmPurchase : FormGroup;
  public formGroup: FormGroup;
  public grid: GridComponent;
  public gridData: any[] =[];
  private cd: Date = new Date();
  public isGridEditMode = false;
  editedRowIndex: any;

  constructor(private fb:FormBuilder,private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.createFrmPurchase();
    this.createFrmPurchase();
    this.loadGridDataSource();
  }

  public loadGridDataSource(purchaseDetailInfo: any = []) {
    if (purchaseDetailInfo === null || purchaseDetailInfo === undefined || purchaseDetailInfo.length === 0) {
      purchaseDetailInfo = [];
    }
    this.gridData = purchaseDetailInfo;
  }

  createFrmPurchase(){
    this.frmPurchase = this.fb.group({
      Id: new FormControl(0),
      PurDate: new FormControl(''),
      SupplierId: new FormControl(''),
      PurchaseDetails: this.fb.array([])
    });
  }



  getPurchaseDetailsForm(){
    return this.frmPurchase.get('PurchaseDetails') as FormArray;
  }


  save(){
    const purchase = this.frmPurchase.getRawValue();
    purchase.PurchaseDetails = this.gridData;
    console.log(purchase);
    if(purchase.Id && purchase.Id > 0){
      this.httpClient.put('http://localhost:5138/api/Purchase/'+purchase.Id ,purchase).subscribe(
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
      this.httpClient.post('http://localhost:5138/api/Purchase',purchase).subscribe(
        (res)=>{
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

  getPurchase(){
    this.httpClient.get('http://localhost:5138/api/Purchase').subscribe(
      (res)=>{
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

  public createPurchaseDetailsFormGroup(dataItem: any = {}): FormGroup {
    return this.fb.group({
      Id: new FormControl(dataItem.Id ?? 0),
      ItemCode: new FormControl(dataItem.ItemCode, Validators.required),
      ItemName: new FormControl(dataItem.ItemName, Validators.required),
      PurchasePrice: new FormControl(dataItem.PurchasePrice)
  });
  }




  clear() {
    this.createFrmPurchase();
    this.formGroup = this.createPurchaseDetailsFormGroup();
    this.gridData = [];
    this.getPurchase();
  }

  public addHandler({ sender }: AddEvent): void {
    this.closeEditor(sender);
    this.formGroup = this.createPurchaseDetailsFormGroup();
    sender.addRow(this.formGroup);
  }

  public editHandler({ sender, rowIndex, dataItem }: EditEvent): void {
    this.closeEditor(sender);

    this.formGroup = this.createPurchaseDetailsFormGroup(dataItem);

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

  public removeHandler({ dataItem , rowIndex}: RemoveEvent): void {
    console.log(dataItem);
    if(confirm('Are You Sure?')){
      // const rowIndex = this.gridData.findIndex(dataItem);
      this.gridData.splice(rowIndex,1);
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

  getSupplier(){
    this.httpClient.get('http://localhost:5138/api/common/supplierdropdown').subscribe(
      (res)=>{
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

}