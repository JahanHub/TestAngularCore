import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ItemsRoutingModule } from './items-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { ItemsComponent } from './items/items.component';

// import { ChartsModule } from "@progress/kendo-angular-charts";
// import { InputsModule } from "@progress/kendo-angular-inputs";

// import { AppComponent } from "./app.component";
// import { RatingComponent } from "./rating.component";

@NgModule({
  declarations: [ItemsComponent],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GridModule,
    PDFModule,
    ExcelModule
  ]
})
export class ItemsModule { }

