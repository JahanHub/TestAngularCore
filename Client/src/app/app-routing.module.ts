import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductsComponent } from './components/products/products.component';
import { LayoutComponent } from './core/components/layout/layout.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '', component: LayoutComponent,
    children: [
      { path: 'customers', loadChildren: () => import('./customers/customers.module').then((m) => m.CustomersModule), },
      { path: 'items', loadChildren: () => import('./items/items.module').then((m) => m.ItemsModule), },
      { path: 'purchase', loadChildren: () => import('./purchase/purchase.module').then((m) => m.PurchaseModule), },
      { path: 'suppliers', loadChildren: () => import('./suppliers/suppliers.module').then((m) => m.SuppliersModule), },
      { path: 'sales', loadChildren: () => import('./sales/sales.module').then((m) => m.SalesModule), },
      { path: 'orders', loadChildren: () => import('./orders/orders.module').then((m) => m.OrdersModule), },
      { path: 'orders', loadChildren: () => import('./orders/orders.module').then((m) => m.OrdersModule), },
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: 'admin', loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule), },
      { path: 'expense', loadChildren: () => import('./expense/expense.module').then((m) => m.ExpenseModule), },
      { path: 'samplereport', loadChildren: () => import('./reports/report.module').then((m) => m.ReportModule), },
      //{ path: 'login', loadChildren: () => import('./login/login.module').then((m) => m.AdminModule), },
              ],},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
