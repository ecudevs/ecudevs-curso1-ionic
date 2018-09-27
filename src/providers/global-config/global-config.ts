import { Injectable } from '@angular/core';

@Injectable()
export class GlobalConfigProvider {

  constructor() {
  }

  getUrlBase(){
    return 'https://todo-ecudeves1.herokuapp.com';
  }

}
