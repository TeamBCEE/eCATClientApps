import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'hammerjs';

import { EcUserUow, EntityManagerProvider } from './data-services';
import { TopNavService, SideNavService } from './nav-services';
import { EcSharedModule } from '../shared';
import { EntityUserModule } from '../../entities/user';
import { AppStartupGuard } from './guard.service';

@NgModule({
  imports: [
    CommonModule,
    EcSharedModule,
    EntityUserModule
  ],
  declarations: [],
  providers: [
    EcUserUow,
    EntityManagerProvider,
    AppStartupGuard,
    TopNavService,
    SideNavService
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
