import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddEvent, CancelEvent, EditEvent, GridComponent, RemoveEvent, SaveEvent } from '@progress/kendo-angular-grid';
import { DatePipe, formatDate } from '@angular/common';
import { forkJoin } from 'rxjs';
import { ListBarProperties } from 'src/app/core/models/list-bar.model';
import { DropDown } from 'src/app/core/models/drop-down.model';
import { BaseApiService } from 'src/app/core/services/base-api.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  private datepipe: DatePipe;
  public frmPurchase: FormGroup;
  public formGroup: FormGroup;
  public grid: GridComponent;
  public gridData: any[] = [];
  private cd: Date = new Date();
  public isGridEditMode = false;
  editedRowIndex: any;
  public itemDropdownData: any[] = [];
  public supplierDropdownData: any[] = [];
  public purchaseList: any[] = [];
  public listProperties: ListBarProperties = new ListBarProperties();
  purchaseListDetail: any[] = [];
  public purchase:any;
  public listTitle = '';

  public defaultItem: DropDown = new DropDown();

  constructor(
    private fb: FormBuilder, 
    private apiService: BaseApiService,
    //private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    this.listTitle = "Purchase List";
    this.initiateListbarProperties()
    this.createFrmPurchase();
    this.loadGridDataSource();
    this.loadDropdowns();
    this.loadPurchaseList();
  }

  initiateListbarProperties(){
    this.listProperties = new ListBarProperties();
    this.listProperties.Header='Id';
    this.listProperties.Others = ['PurDate','SupplierId']
  }

  public loadGridDataSource(purchaseDetailInfo: any = []) {
    if (purchaseDetailInfo === null || purchaseDetailInfo === undefined || purchaseDetailInfo.length === 0) {
      purchaseDetailInfo = [];
    }
    this.gridData = purchaseDetailInfo;
  }

  createFrmPurchase(dataItem: any ={}) {
    this.frmPurchase = this.fb.group({
      Id: new FormControl(dataItem.Id ?? 0),
      PurId: new FormControl(1),
      PurDate: new FormControl(dataItem.PurDate?new Date(formatDate(dataItem.PurDate,'yyyy-MM-dd','en')) :new Date()),
      SupplierId: new FormControl(dataItem.SupplierId?? 0),
      PurchaseDetails: this.fb.array([])
    });
  }

  getPurchaseDetailsForm() {
    return this.frmPurchase.get('PurchaseDetails') as FormArray;
  }

  save() {
    const purchase = this.frmPurchase.getRawValue();
    purchase.PurchaseDetails = this.gridData;
    if (purchase.Id && purchase.Id > 0) {
      this.apiService.put('api/Purchase/' + purchase.Id, purchase).subscribe(
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
      this.apiService.post('api/Purchase', purchase).subscribe(
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

  public delete() {
    const id = this.frmPurchase.getRawValue().Id;
    if (confirm('Are you sure to delete? Item: ' + id)) {
      return this.apiService.delete('api/Purchase/' + id).subscribe(
        (res)=>{
          this.frmPurchase.reset();
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

  getPurchase() {
    this.apiService.get('api/Purchase').subscribe(
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

  public createPurchaseDetailsFormGroup(dataItem: any = {}): FormGroup {
    console.log(dataItem);
    return this.fb.group({
      Id: new FormControl(dataItem.Id ?? 0),
      ItemId: new FormControl(dataItem.ItemId, Validators.required),
      ItemName: new FormControl(dataItem.ItemName, Validators.required),
      PurchasePrice: new FormControl(dataItem.PurchasePrice),
      Qty: new FormControl(dataItem.Qty ?? 0, Validators.required),
      Amount: new FormControl(dataItem.Amount ?? 0),
    });
  }

  clear() {
    this.createFrmPurchase();
    this.formGroup = this.createPurchaseDetailsFormGroup();
    this.gridData = [];
    this.loadPurchaseList();
    this.getPurchase();
    this.frmPurchase.reset();
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
    console.log(frmValue);

    const duplicateData = this.gridData.filter(i=> i.ItemId == frmValue.ItemId);
    console.log('gridData: ',this.gridData);
    if (duplicateData.length > 0) {
      alert('Duplicate Found!')
      return;
    }

    frmValue.Amount = frmValue.PurchasePrice * frmValue.Qty;
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

  getSupplier() {
    this.apiService.get('api/common/supplierdropdown').subscribe(
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
    forkJoin([this.loadSuppliers(), this.loadItems()]).subscribe(
      ([res1, res2]) => {
        this.supplierDropdownData = res1[`Data`];
        this.itemDropdownData = res2[`Data`] as any[];
        console.log('res2: ',res2);
      },
      (err) => {

      }
    )
  }

  loadSuppliers() {
    return this.apiService.get('api/common/supliers');
  }

  loadItems() {
    return this.apiService.get('api/Common/items');
  }

  onItemDropDownChange(e){
    this.apiService.get('api/Items/'+ e.Value).subscribe(
        (res)=>{
        const itemData = res as any;
        console.log(this.purchaseList);
        this.formGroup.patchValue({
          ItemName: itemData.ItemName,
          ItemId: itemData.Id,
          PurchasePrice: itemData.PurchasePrice,
          Qty: itemData.Qty
        });
      },
      (err)=>{
        
      },
      ()=>{

      }
    );
    
  }

//   private loadPurchase(): void {
//     this.baseDataService
//       .callServer(
//         'GET',
//         'api/Purchase'
//       )
//       .subscribe((res) => {
//         // tslint:disable-next-line: no-string-literal

//         this.pur = res[`data`];
//       });

// }
loadPurchaseList() {
  return this.apiService.get('api/Purchase').subscribe(
    (res)=>{
      this.purchaseList = res as any[];
      console.log(this.purchaseList);
    },
    (err)=>{
      
    },
    ()=>{

    }
  )
}

public itemSelected(item: any) {
  return this.apiService.get('api/Purchase/' + item.Id).subscribe(
    (res)=>{
      this.purchase = res;
      this.mapItem(this.purchase);
      console.log(res);
    },
    (err)=>{
      //this.toastr.error('Error Occurred : ' + err, 'Error');
    },
    ()=>{

    }
  )
}

public mapItem(item: any) {

  this.gridData = item.PurchaseDetails;
  const items = this.itemDropdownData;
  this.gridData.map((v,i)=>{
    const index = items.filter(i=> i.Value === v.ItemId);
    const e= index[0];
    v.ItemName = e.Text;
    v.Amount = (v.Qty * v.PurchasePrice);
  });
  this.gridData = this.gridData;
  this.createFrmPurchase(item);
}

createPurchaseFormGroup(): FormGroup {
  return this.fb.group({
    id:  new FormControl(null),
    PurDate:  new FormControl(null),
    SupplierId: new FormControl(null),
  });
}

public totalAmountCalculation(item: any, rowIndex: number) {
  if (item !== null) {
    const qty = this.formGroup.get('Qty').value;
    const price = this.formGroup.get('PurchasePrice').value;
    const totalAmount = (qty*price);
    item.Amount = totalAmount;
    this.gridData[rowIndex] = item;
    this.gridData = this.gridData;
  }
}

getFooterQtySum(column) {
    //let sum = 0;
    // this.getPurchaseDetailsForm.controls.forEach((ele) => {
    //   sum += ele.get(column).value;
    // });

    const sum = this.gridData.reduce((pre, cur) => pre += (+cur[column]), 0);
    return isNaN(sum) ? 0 : sum;
}

}
