import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppDashboardComponent } from './dashboard.component';

export const dashboardRouterableComponents: any[] = [
    AppDashboardComponent
];

const dashboardRoutes: Routes = [
    { path: '', component: AppDashboardComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(dashboardRoutes)
    ],
    exports: [RouterModule]
})
export class EcDashboardRoutingModule {

    constructor() {
        console.log('Dashboard App Routing Module running!!!!');
    }
};
