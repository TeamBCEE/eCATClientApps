import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppDashboardComponent } from './dashboard.component';
import { MainDashComponent } from './main';

export const dashboardRouterableComponents: any[] = [
    AppDashboardComponent,
    MainDashComponent
];

const dashboardRoutes: Routes = [
    { path: '',
      component: AppDashboardComponent,
      children: [
        {
            path: '',
            component: MainDashComponent
        }
      ]}
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
