import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import {
    config, EntityManager, NamingConvention, DataService, DataType, MetadataStore,
    EntityType, NavigationProperty, DataProperty, EntityQuery, DataServiceOptions, promises
} from 'breeze-client';

// Import required breeze adapters. Rollup.js requires the use of breeze.base.debug.js, which doesn't include
// the breeze adapters. 
import 'breeze-client/breeze.dataService.webApi';
import 'breeze-client/breeze.modelLibrary.backingStore';
import 'breeze-client/breeze.uriBuilder.json';
import 'breeze-client/breeze.uriBuilder.odata';

import { environment as env } from '../../../environments/environment';

import { EcEntityDomain } from '../../app-constants';
import { RegistrationHelper, EntityTypeAnnotation } from '../../../entities';

export interface IEmStatus {
    etDomain: EcEntityDomain;
    etManager: EntityManager;
    promise: promises.IPromise<any>;
    [index: number]: IEmStatus;
}

// The EntityManagerProvider manages a static master manager and a per instance sandbox manager.
@Injectable()
export class EntityManagerProvider {

    private static _masterManagers: Array<IEmStatus> = [];

    constructor() {
        NamingConvention.camelCase.setAsDefault();
        config.initializeAdapterInstances({ dataService: 'webApi', uriBuilder: 'odata' });
    }

    prepare(entityDomain: EcEntityDomain, regHelper: RegistrationHelper, serviceEndpoint: string): promises.IPromise<any> {
        let emStatus = EntityManagerProvider._masterManagers[entityDomain];

        if (!emStatus) {
            emStatus = EntityManagerProvider._masterManagers[entityDomain] = {
                etDomain: entityDomain,
                etManager: null,
                promise: null,
            };
        }

        if (!emStatus.promise) {
            // Configure breeze adapaters. See rollup.js comment above
            serviceEndpoint = `${env.apiEndpoint}/breeze/${serviceEndpoint}`;

            console.log(serviceEndpoint);
            let dsconfig: DataServiceOptions = {
                serviceName: serviceEndpoint
            };

            if (location.port === '3000') {
                // Configure the json uriBuilder. See rollup.js comment above
                config.initializeAdapterInstance('uriBuilder', 'json', false);
                dsconfig.uriBuilderName = 'json'; // for breeze-sequelize server
            }

            let dataService = new DataService(dsconfig);

            let currentManager = emStatus.etManager = new EntityManager({
                dataService: dataService
            });

            //refactor this out to a mock endpoint
            // if (env.dev) {
            //     const devMetadata = env.metadata;
            //     emStatus.etManager.metadataStore.importMetadata(devMetadata(entityDomain));
            //     regHelper.register(emStatus.etManager.metadataStore);
            //     this.registerAnnotations(emStatus.etManager.metadataStore);
            //     return <any>Promise.resolve();
            // }

            return emStatus.promise = emStatus.etManager.fetchMetadata().then(() => {
                regHelper.register(emStatus.etManager.metadataStore);
                this.registerAnnotations(emStatus.etManager.metadataStore);

                // Load lockups
                //let query = EntityQuery.from('startup');
                //return emStatus.etManager.executeQuery(query);
            }).catch(e => {
                // If there's an error, we need to ensure prepare can be called fresh
                emStatus.promise = null;
                throw e;
            });
        }

        return emStatus.promise;
    }

    reset(manager: EntityManager): void {
        if (manager) {
            manager.clear();
            //this.seedManager(manager);
        }
    }

    newManager(entityDomain: EcEntityDomain): EntityManager {
        return EntityManagerProvider._masterManagers[entityDomain].etManager;
    }

    // private seedManager(manager: EntityManager) {
    //     manager.importEntities(EntityManagerProvider._masterManager.exportEntities(null, { asString: false, includeMetadata: false }));
    // }

    private registerAnnotations(metadataStore: MetadataStore) {
        metadataStore.getEntityTypes().forEach((t: EntityType) => {
            let et = <EntityType>t;
            let ctor = <any>et.getCtor();
            if (ctor && ctor.getEntityTypeAnnotation) {
                let etAnnotation = <EntityTypeAnnotation>ctor.getEntityTypeAnnotation();
                et.validators.push(...etAnnotation.validators);
                etAnnotation.propertyAnnotations.forEach((pa) => {
                    let prop = et.getProperty(pa.propertyName);
                    prop.validators.push(...pa.validators);
                    prop.displayName = pa.displayName;
                });
                this.ignoreForSerialization(metadataStore, t, ...etAnnotation.ignoreForSerialization);
            }
        });
    }

    private ignoreForSerialization(metadataStore: MetadataStore, typeInfo: string | EntityType, ...propertyNames: string[]) {
        if (!propertyNames || propertyNames.length === 0) return;

        let entityType = typeof (typeInfo) === 'string' ? <EntityType>metadataStore.getEntityType(<string>typeInfo) : <EntityType>typeInfo;

        // Recursivley walk the inheritance tree and ignore the same properties for all parent types
        let parentTypes = metadataStore.getEntityTypes().filter(type => {
            let parentType = <EntityType>type;
            return parentType.baseEntityType && parentType.baseEntityType === entityType;
        });
        parentTypes.forEach((parentType: EntityType) => this.ignoreForSerialization(metadataStore, parentType, ...propertyNames));

        // Now ignore for current type
        let dps = propertyNames.map(propertyName => {
            let dp = entityType.getDataProperty(propertyName);
            if (!dp) {
                console.warn(`No data property with name ${propertyName} found in entity type ${entityType.shortName}`);
            }
            return dp;
        });
        // Get all the nulls out
        _.remove(dps, dp => !dp);

        // Get existing ignored properties
        let ignoredProperties: DataProperty[] = (<any>entityType).$ignoredProperties;

        // Signals that we've already installed our custom serializerFn
        if (ignoredProperties) {
            _.remove(dps, dp => _.includes(ignoredProperties, dp));
            ignoredProperties = ignoredProperties.concat(dps);
        } else {
            // First ignored properties for this entity type
            ignoredProperties = dps;
            let origSerializerFn: (dataProperty: DataProperty, value: any) => any = (<any>entityType).serializerFn;
            entityType.setProperties({
                serializerFn: (dp, value) => {
                    if (_.includes((<any>entityType).$ignoredProperties, dp)) {
                        // Return undefined if property is ignored for serialization
                        return undefined;
                    }

                    return origSerializerFn ? origSerializerFn(dp, value) : value;
                }
            });
        }
        (<any>entityType).$ignoredProperties = ignoredProperties;
    }
}
