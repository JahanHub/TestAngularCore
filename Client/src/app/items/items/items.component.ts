import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GridComponent } from '@progress/kendo-angular-grid';
import { SelectableSettings } from '@progress/kendo-angular-treeview';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ["./pdf-style.css"],
})
export class ItemsComponent implements OnInit {

  public frmItem : FormGroup;

  public grid: GridComponent;
  public gridData: any[] =[];
  public mySelection: number[] = [];
  public files: any[];
  public imagePath;
  imgURL: any;
  public message: string;
  public itemData: Item;
  public selectedFile: File;

  public selectedFileString: string;
  public selectedFileName: string;
  public itemImageSelected: boolean = false;
  public itemPhotoUrl: any = '';

  public selectableSettings: SelectableSettings = {
    enabled: false
  };

  constructor(private fb:FormBuilder,private httpClient: HttpClient) {  this.files = [];}

  ngOnInit(): void {
    this.clear();
  }

  createFrmItem(){
    this.frmItem = this.fb.group({
      Id: new FormControl(0),
      ItemCode: new FormControl(''),
      ItemName: new FormControl(''),
      PurchasePrice: new FormControl(''),
      SalesPrice: new FormControl(''),
      Photo: new FormControl(''),
    });
  }
  save(){
    const item = this.frmItem.getRawValue();

    let fd = new FormData();

    fd.append("Id", item.Id.toString());
    fd.append("ItemCode", item.ItemCode.toString());
    fd.append("ItemName", item.ItemName.toString());
    fd.append("PurchasePrice", item.PurchasePrice.toString());
    fd.append("SalesPrice", item.SalesPrice.toString());
    if (this.selectedFile != null) {
      fd.append("Photo", this.selectedFile, this.selectedFile.name);
    }
console.log(this.selectedFile);
    
    if(item.Id && item.Id > 0){
      this.httpClient.put('http://localhost:5138/api/Items/'+item.Id ,fd).subscribe(
        (res)=>{
          console.log('Item get:');
          this.clear();
        },
        (err) => {
          console.log("Can't Saved!");
        },
        () => {

        }
      );
    } else {
      this.httpClient.post('http://localhost:5138/api/Items',fd).subscribe(
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
      SalesPrice: item.SalesPrice,
      Photo: item.Photo
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

  getAverage(columnName){
   const total = this.gridData.reduce((previous,current)=> previous + current[columnName], 0);
   const average =total/this.gridData.length;
   return average;
  }

  onFileChanged(event: any) {
    this.files = event.target.files;
  }

  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }


  onImageSelected(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file: File = event.target.files[0];
      this.selectedFile = event.target.files[0];
      let FileIsValid: boolean = (this.AllowedExt.indexOf(file.name.split('.').pop()) !=-1);
      console.log(file.name, file.name.split('.').pop());
      if (FileIsValid) {
        reader.readAsDataURL(file);
        reader.onload = (e: any) => {
          this.selectedFileString = (reader.result as string).split(',')[1];
          this.itemPhotoUrl = e.target.result;
          this.selectedFileName = file.name;
        };
        this.itemImageSelected = true;
      }
      else {
        alert('Only .jpeg, .jpg, .png Files are Allowed!');
        this.selectedFile = null;
      }
    }
    this.preview(event.target.files);
  }
  AllowedExt = ["png", "jpeg", "jpg"];
}
