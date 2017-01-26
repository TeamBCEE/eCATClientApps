import { Component, OnInit } from '@angular/core';
import { EcUserUow } from '../core';
import { EcEntityDomain } from '../app-constants';
import { Person } from '../../entities/user';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class AppDashboardComponent implements OnInit {
    title = 'app works!';
    testPerson: Person;
    /**
     *
     */
    constructor(private userUow: EcUserUow) {

    }

    ngOnInit() {
        console.log(this.userUow);
        this.userUow.person
            .withId(1)
            .then((foundPerson) => {
                this.testPerson = foundPerson;
                this.title = `app works for ${this.testPerson.lastName}, ${this.testPerson.firstName}: ${this.testPerson.id}`;
            });

    }
}
