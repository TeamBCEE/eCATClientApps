import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { CovalentCoreModule } from '@covalent/core';

import { EcUserUow, EntityManagerProvider } from './data-services';
import { EcSharedModule } from '../shared';
import { AppStartupGuard } from './guard.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot(),
    CovalentCoreModule.forRoot(),
    EcSharedModule,
  ],
  declarations: [],
  providers: [
    EcUserUow,
    EntityManagerProvider,
    AppStartupGuard
  ]
})
export class CoreModule { }
