import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GridComponent } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, filterBy } from '@progress/kendo-data-query';
import { demoData } from './data/data';

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
  public elPropertyName:string[]=[];
  public customerDataSource: any[] = [];
  public filter: CompositeFilterDescriptor;

  constructor(private fb:FormBuilder,private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.clear();
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
    });
  }
  save(){
    const customer = this.frmCustomer.getRawValue();
    console.log(customer);

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


