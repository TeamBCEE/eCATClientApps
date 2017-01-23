import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
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
    HttpModule,
    CoreModule,
    EcSharedModule,
    EcAppRoutingModule,
  ],
  providers: [],
  bootstrap: [appRouterableComponents[0]]
})
export class AppModule { }
