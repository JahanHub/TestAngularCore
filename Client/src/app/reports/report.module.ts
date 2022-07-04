import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { SampleReportComponent } from './report/sample-report.component';

@NgModule({
  declarations: [SampleReportComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PDFModule,
    ExcelModule,
    DropDownsModule,
    DateInputsModule,
  ]
})
export class ReportModule { }
