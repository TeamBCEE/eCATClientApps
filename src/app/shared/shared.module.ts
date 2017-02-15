import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CovalentCoreModule } from '@covalent/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    RouterModule,
    CommonModule,
    CovalentCoreModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: []
})
export class EcSharedModule {

  constructor(private _iconRegistry: MdIconRegistry,
    private _domSanitizer: DomSanitizer) {
    _iconRegistry.addSvgIconInNamespace('assets', 'logo', _domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/sitelogo.svg'));
  }
}
