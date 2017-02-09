import { Injectable } from '@angular/core';
import { EcUserUow } from '../data-services';

@Injectable()
export class TopNavService {

  constructor() { }
  getNavTitle(area: string) {
    return `EPME C.A.T: area`;
  }
}
