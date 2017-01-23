import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppStartupGuard } from './core';
export const appRouterableComponents: any[] = [
    AppComponent
];

const appRoutes: Routes = [
    { path: '', loadChildren: './+dashboard/dashboard.module#EcDashboardModule', canLoad: [AppStartupGuard] }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class EcAppRoutingModule {

    constructor() {
        console.log('App Routing Module running!!!!');
    }
};
