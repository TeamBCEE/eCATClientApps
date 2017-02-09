import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CovalentCoreModule } from '@covalent/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
     ],
  exports: [
    RouterModule,
    CommonModule,
    CovalentCoreModule
  ],
  declarations: []
})
export class EcSharedModule { }
