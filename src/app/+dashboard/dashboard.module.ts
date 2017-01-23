import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcSharedModule } from '../shared';
import { dashboardRouterableComponents, EcDashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EcSharedModule,
    EcDashboardRoutingModule,
  ],
  declarations: [
    dashboardRouterableComponents
  ]
})
export class EcDashboardModule { }
