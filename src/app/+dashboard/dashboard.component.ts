import { Component, OnInit } from '@angular/core';
import { EcUserUow } from '../core';
import { EcEntityDomain } from '../app-constants';
import { Person } from '../../entities/user';
import { TopNavService } from '../core/nav-services';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class AppDashboardComponent implements OnInit {
    testPerson: Person;
    title: string;
    /**
     *
     */
    constructor(private userUow: EcUserUow, private tnService: TopNavService) {

    }

    ngOnInit() {

        this.title = this.tnService.getNavTitle('Dashboard');

        this.userUow.person
            .withId(1)
            .then((foundPerson) => {
                this.testPerson = foundPerson;
                this.title = `app works for ${this.testPerson.lastName}, ${this.testPerson.firstName}: ${this.testPerson.id}`;
            });

    }
}
