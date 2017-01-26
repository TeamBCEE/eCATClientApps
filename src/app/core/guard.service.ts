import { Injectable } from '@angular/core';
import { CanLoad, CanDeactivate, Route, RouterStateSnapshot, Routes, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { EntityManagerProvider } from './data-services';
import { EcEntityDomain } from '../app-constants';
import { UserRegistrationHelper } from '../../entities/user';
//import { BusyService } from './busy.service';
//import { AuthService } from './auth.service';

export interface CanComponentDeactivate {
    canDeactivate: () => boolean | Observable<boolean> | Promise<boolean>;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(component: CanComponentDeactivate): Observable<boolean> | Promise<boolean> | boolean {
        return component.canDeactivate ? component.canDeactivate() : true;
    }
}

@Injectable()
export class AppStartupGuard implements CanLoad {
    constructor(private entityManagerProvider: EntityManagerProvider, private regHelper: UserRegistrationHelper, private router: Router) { }

    canLoad(route: Route) {
        return <any>this.entityManagerProvider.prepare(EcEntityDomain.User, this.regHelper, 'User')
            .then(() => true)
            .catch(e => {
                if (e.status === 401) {
                    //this.authService.redirectUrl = state.url;
                    this.router.navigate(['/login']);
                    return false;
                }

                // Something else happened
                throw e;
            });
    }
}
