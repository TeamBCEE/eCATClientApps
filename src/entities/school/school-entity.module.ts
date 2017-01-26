import { NgModule } from '@angular/core';
import { SchoolRegistrationHelper } from './regHelper';
import { Campus } from './campus';
import { CourseOffering } from './courseOffering';
import { CourseSection } from './courseSection';
import { FacultySectionMbr } from './facultySectionMbr';
import { StudentSectionMbr } from './studentSectionMbr';
import { Seminar } from './seminar';

@NgModule({
  declarations: [],
  providers: [SchoolRegistrationHelper]
})
export class EntitySchoolModule { }
