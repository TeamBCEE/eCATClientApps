import { Injectable } from '@angular/core';

import { UnitOfWork, IRepository } from '../../shared';
import { EntityManagerProvider } from './em-provider.service';
//import { Person } from '../../../entities';
import { EcEntityType } from '../../app-constants';

@Injectable()
export class EcUserUow extends UnitOfWork {

    //person: IRepository<Person>;

    /**
     *
     */
    constructor(emProvider: EntityManagerProvider) {
        super(emProvider);
        //this.person = this.createRepository<Person>(Person.etName, Person.etResourceLocation, true);
    }
}
