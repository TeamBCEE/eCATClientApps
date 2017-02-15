import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { CovalentCoreModule } from '@covalent/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoreModule } from './core';
import { EcAppRoutingModule, appRouterableComponents } from './app-routing.module';
import { BreezeBridgeAngular2Module } from 'breeze-bridge-angular2';
import { EcSharedModule } from './shared';

@NgModule({
  declarations: [
    appRouterableComponents[0]
  ],
  imports: [
    BreezeBridgeAngular2Module,
    BrowserModule,
    FormsModule,
    MaterialModule.forRoot(),
    CovalentCoreModule.forRoot(),
    HttpModule,
    CoreModule,
    EcSharedModule,
    EcAppRoutingModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [appRouterableComponents[0]]
})
export class AppModule { }
