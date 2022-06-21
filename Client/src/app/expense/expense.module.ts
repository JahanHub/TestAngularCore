import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { ExpenseRoutingModule } from './expense-routing.module';
import { ExpenseComponent } from './expense/expense.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

@NgModule({
  declarations: [ExpenseComponent],
  imports: [
    CommonModule,
    ExpenseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GridModule,
    PDFModule,
    ExcelModule,
    DropDownsModule,
    DateInputsModule
  ]
})
export class ExpenseModule { }

