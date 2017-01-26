import { MetadataStore } from 'breeze-client';
import { Injectable } from '@angular/core';
import { RegistrationHelper } from '../regHelper';
import { Campus } from './campus';
import { CourseOffering } from './courseOffering';
import { CourseSection } from './courseSection';
import { FacultySectionMbr } from './facultySectionMbr';
import { StudentSectionMbr } from './studentSectionMbr';
import { Seminar } from './seminar';

@Injectable()
export class SchoolRegistrationHelper implements RegistrationHelper {
    register(metadataStore: MetadataStore) {
        metadataStore.registerEntityTypeCtor('Campus', Campus);
metadataStore.registerEntityTypeCtor('CourseOffering', CourseOffering);
metadataStore.registerEntityTypeCtor('CourseSection', CourseSection);
metadataStore.registerEntityTypeCtor('FacultySectionMbr', FacultySectionMbr);
metadataStore.registerEntityTypeCtor('StudentSectionMbr', StudentSectionMbr);
metadataStore.registerEntityTypeCtor('Seminar', Seminar);
        }
}
