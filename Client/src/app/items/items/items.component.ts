import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GridComponent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  //styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  public frmItem : FormGroup;

  public grid: GridComponent;
  public gridData: any[] =[];

  constructor(private fb:FormBuilder,private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.clear();
  }

  createFrmItem(){
    this.frmItem = this.fb.group({
      Id: new FormControl(0),
      ItemCode: new FormControl(''),
      ItemName: new FormControl(''),
      PurchasePrice: new FormControl(''),
      SalesPrice: new FormControl('')
    });
  }
  save(){
    const item = this.frmItem.getRawValue();
    console.log(item);

    if(item.Id && item.Id > 0){
      this.httpClient.put('http://localhost:5138/api/Items/'+item.Id ,item).subscribe(
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
      this.httpClient.post('http://localhost:5138/api/Items',item).subscribe(
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

  getItem(){
    this.httpClient.get('http://localhost:5138/api/Items').subscribe(
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

  onRowEdit(item: any){
    this.frmItem.patchValue({
      Id:item.Id,
      ItemCode: item.ItemCode,
      ItemName: item.ItemName,
      PurchasePrice: item.PurchasePrice,
      SalesPrice: item.SalesPrice
    })
  }


  onRowDelete(item: any){
    if(confirm('Are You Sure?')){
      this.httpClient.delete('http://localhost:5138/api/Items/'+ item.Id).subscribe(
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
    this.createFrmItem();
    this.getItem();
  }

}
