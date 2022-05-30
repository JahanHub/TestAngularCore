import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GridComponent } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, filterBy } from '@progress/kendo-data-query';
import { forkJoin } from 'rxjs';
import { DropDown } from '../core/models/drop-down.model';
import { BaseApiService } from '../core/services/base-api.service';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  public frmCustomer : FormGroup;

  public customerList: any[];
  public clearButtonText: string = "Clear";
  public grid: GridComponent;
  public gridData: any[] =[];
  public originalData: any[] = [];
  public gridDemoData: any[] =[];
  public upazilaDropdownData: any[] = [];
  public villageDropdownData: any[] = [];
  public elPropertyName:string[]=[];
  public customerDataSource: any[] = [];
  public filter: CompositeFilterDescriptor;
  public defaultItem: DropDown = new DropDown();
  public villageData: any[] = [];

  constructor(private fb:FormBuilder, private httpClient: HttpClient,  private apiService: BaseApiService) { }

  ngOnInit(): void {
    this.clear();
    this.loadDropdowns();
    //this.gridDemoData = demoData;
    //this.elPropertyName = this.getPropertyNameArray(this.gridDemoData);
  }

  createFrmCustomer(){
    this.frmCustomer = this.fb.group({
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
    const customer = this.frmCustomer.getRawValue();

    if(customer.Id && customer.Id > 0){
      this.httpClient.put('http://localhost:5138/api/Customers/'+customer.Id ,customer).subscribe(
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
      this.httpClient.post('http://localhost:5138/api/Customers',customer).subscribe(
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

  getCustomer(){
    this.httpClient.get('http://localhost:5138/api/Customers').subscribe(
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
    this.frmCustomer.patchValue({
      VillageId: null
    });
    if (item !== null) {
      const upazilaId = this.frmCustomer.controls.UpazilaId.value;
        return this.apiService.get(`api/common/villages?UpazilaId=${upazilaId}`).subscribe((res) => {
          this.villageData = res[`Data`];
        });;
    }
  }

  onRowEdit(customer: any){
    this.clearButtonText = "Clear";
    this.frmCustomer.patchValue({
      Id:customer.Id,
      FirstName: customer.FirstName,
      LastName: customer.LastName,
      Address: customer.Address,
      Address2: customer.Address2,
      City: customer.City,
      Zip: customer.Zip,
      UpazilaId: customer.UpazilaId,
      VillageId: customer.VillageId,
    })
  }


  onRowDelete(customer: any){
    if(confirm('Are You Sure?')){
      this.httpClient.delete('http://localhost:5138/api/Customers/'+ customer.Id).subscribe(
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
    this.createFrmCustomer();
    this.getCustomer();
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

  private loadItems(): void {
    if (
      this.customerDataSource &&
      this.customerDataSource !== null &&
      this.customerDataSource !== undefined &&
      this.customerDataSource.length > 0
    ) {
      this.gridData = this.customerDataSource;
    } else {
      this.gridData = null;
    }
  }
  public filterChange(filterItem: CompositeFilterDescriptor): void {
    this.filter = filterItem;
    if (
      this.originalData &&
      this.originalData !== null &&
      this.originalData !== undefined &&
      this.originalData.length > 0
    ) {
      this.customerDataSource = this.originalData;
      this.customerDataSource = filterBy(
        this.customerDataSource,
        this.filter
      );
      this.loadItems();
    }
  }




}


