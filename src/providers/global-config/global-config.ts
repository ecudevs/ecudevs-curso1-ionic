import { Injectable } from '@angular/core';

@Injectable()
export class GlobalConfigProvider {

  constructor() {
  }

  getUrlBase(){
    return 'http://localhost:9000';
  }

}
