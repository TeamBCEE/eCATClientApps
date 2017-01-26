import { Injectable } from '@angular/core';

import { UnitOfWork, IRepository } from '../../shared';
import { EntityManagerProvider } from './em-provider.service';
import { Person } from '../../../entities/user';
import { EcEntityDomain } from '../../app-constants';

@Injectable()
export class EcUserUow extends UnitOfWork {

    person: IRepository<Person>;

    /**
     *
     */
    constructor(emProvider: EntityManagerProvider) {
        super(EcEntityDomain.User, emProvider);
        this.person = this.createRepository<Person>('Person', Person.resourceName, true);
        console.log(this.person);
    }
}
