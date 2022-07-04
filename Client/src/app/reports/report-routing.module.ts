import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SampleReportComponent } from './report/sample-report.component';

const routes: Routes = [
  { path: '', component: SampleReportComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}