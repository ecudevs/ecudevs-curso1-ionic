import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { GlobalConfigProvider } from '../global-config/global-config';

@Injectable()
export class TodoProvider {

  constructor(private http: Http,
    private globalConfig: GlobalConfigProvider) { }

  // EN ESTE METODO VAMOS A DEVOLVER UN ARREGLO DE OBJETOS TIPO ToDoItem
  get() {

    // De esta manera hacemos una peticion get a la ruta http://localhost:9000/api/todo
    return this.http.get(this.globalConfig.getUrlBase() + '/api/todo/')
      .pipe(map((response: Response) => response.json()));
  }

  insertar(model) {
    // De esta manera hacemos una peticion post a la ruta http://localhost:9000/api/todo
    return this.http.post(this.globalConfig.getUrlBase() + '/api/todo/', model)
      .pipe(map((response: Response) => response.json()));
  }

  actualizar(model) {
    // De esta manera hacemos una peticion put a la ruta http://localhost:9000/api/todo
    return this.http.put(this.globalConfig.getUrlBase() + '/api/todo/', model)
      .pipe(map((response: Response) => response.json()));
  }

}
