import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { PurchaseComponent } from './purchase/purchase.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { CoreModule } from '../core/core.module';
@NgModule({
  declarations: [PurchaseComponent],
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    DateInputsModule,
    DropDownsModule,
    CoreModule
  ]
})
export class PurchaseModule { }

