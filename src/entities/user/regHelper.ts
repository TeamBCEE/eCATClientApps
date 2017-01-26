import { MetadataStore } from 'breeze-client';
import { Injectable } from '@angular/core';
import { RegistrationHelper } from '../regHelper';
import { Person } from './person';

@Injectable()
export class UserRegistrationHelper implements RegistrationHelper {
    register(metadataStore: MetadataStore) {
        metadataStore.registerEntityTypeCtor('Person', Person, Person.initializer);
    }
}
