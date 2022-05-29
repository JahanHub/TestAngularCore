import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { CoreModule } from './core/core.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    PageNotFoundComponent,
    DashboardComponent
  ],
  imports: [BrowserModule, AdminModule, CoreModule, AppRoutingModule, GridModule, BrowserAnimationsModule,HttpClientModule,FormsModule,ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
