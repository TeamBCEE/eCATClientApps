import { MetadataStore } from 'breeze-client';

export interface RegistrationHelper {
    register(meta: MetadataStore): void;
}