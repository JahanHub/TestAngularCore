import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ListbarComponent } from './components/listbar/listbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { CoreRoutingModule } from './core-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent,
    LayoutComponent,
    ListbarComponent,
    SidenavComponent,
    HeaderComponent   
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  exports: [
    ListbarComponent,
    HeaderComponent,
    LayoutComponent,
    SidenavComponent
  ]
})
export class CoreModule {}
