import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SalesRoutingModule } from './sales-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { SalesComponent } from './sales/sales.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { CoreModule } from '../core/core.module';
@NgModule({
  declarations: [SalesComponent],
  imports: [
    CommonModule,
    SalesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GridModule,
    DateInputsModule,
    DropDownsModule,
    CoreModule
  ]
})
export class SalesModule { }

