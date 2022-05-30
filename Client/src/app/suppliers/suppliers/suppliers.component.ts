import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GridComponent } from '@progress/kendo-angular-grid';
import { DropDown } from 'src/app/core/models/drop-down.model';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html'
})
export class SuppliersComponent implements OnInit {

  public frmSupplier : FormGroup;
  public supplierList: any[];
  public clearButtonText: string = "Clear";
  public grid: GridComponent;
  public gridData: any[] =[];
  public gridDemoData: any[] =[];
  public elPropertyName:string[]=[];
  public upazilaDropdownData: any[] = [];
  public villageDropdownData: any[] = [];
  public defaultItem: DropDown = new DropDown();
  public formGroup: FormGroup;
  public villageData: any[] = [];

  constructor(private fb:FormBuilder,private httpClient: HttpClient,  private apiService: BaseApiService) { }

  ngOnInit(): void {
    this.clear();
    this.elPropertyName = this.getPropertyNameArray(this.gridDemoData);
    this.loadDropdowns();
    //this.loadVillageByUpazila();
  }

  createFrmSupplier(){
    this.frmSupplier = this.fb.group({
      Id: new FormControl(0),
      FirstName: new FormControl(''),
      LastName: new FormControl(''),
      Address: new FormControl(''),
      Address2: new FormControl(''),
      City: new FormControl(''),
      Zip: new FormControl(''),
      UpazilaId: new FormControl(0),
      VillageId: new FormControl(0),
    });
  }

  save(){
    const supplier = this.frmSupplier.getRawValue();

    if(supplier.Id && supplier.Id > 0){
      this.httpClient.put('http://localhost:5138/api/suppliers/'+supplier.Id ,supplier).subscribe(
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
      this.httpClient.post('http://localhost:5138/api/suppliers',supplier).subscribe(
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

  getSupplier(){
    this.httpClient.get('http://localhost:5138/api/suppliers').subscribe(
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

  loadDropdowns() {
    forkJoin([this.loadUpazilas(),this.loadVillages(),]).subscribe(
      ([res1, res2]) => {
        this.upazilaDropdownData = res1[`Data`];
        this.villageDropdownData = res2 as any[];
      },
      (err) => {

      }
    )
  }
  loadUpazilas() {
    return this.apiService.get('api/common/upazilas');
  }
  loadVillages() {
    return this.apiService.get('api/common/villages');
  }

  public loadVillageByUpazila(item: any) {
    this.frmSupplier.patchValue({
      VillageId: null
    });
    if (item !== null) {
      const upazilaId = this.frmSupplier.controls.UpazilaId.value;
      this.apiService.get(`api/common/villages?UpazilaId=${upazilaId}`).subscribe((res) => {
          this.villageData = res[`Data`];
        });;
    }
  }

  onRowEdit(supplier: any){
    this.clearButtonText = "Clear";
    this.frmSupplier.patchValue({
      Id:supplier.Id,
      FirstName: supplier.FirstName,
      LastName: supplier.LastName,
      Address: supplier.Address,
      Address2: supplier.Address2,
      City: supplier.City,
      Zip: supplier.Zip,
      UpazilaId: supplier.UpazilaId,
      VillageId: supplier.VillageId,
    })
  }

  onRowDelete(supplier: any){
    if(confirm('Are You Sure?')){
      this.httpClient.delete('http://localhost:5138/api/suppliers/'+ supplier.Id).subscribe(
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
    this.clearButtonText = "Cancel";
    this.createFrmSupplier();
    this.getSupplier();
  }

  getPropertyNameArray(data:any[]){
    const returnObj: any[] =[];
    if (data.length>0) {
      Object.keys(data[0]).forEach(prop =>{
        returnObj.push(prop);
      });
    }
    return returnObj;
  }

}


