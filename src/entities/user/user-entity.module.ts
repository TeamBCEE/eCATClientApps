import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegistrationHelper } from './regHelper';
import { Person } from './person';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [UserRegistrationHelper]
})
export class EntityUserModule { }
