import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class LocalStorageProvider {

  constructor(private storage: Storage) {
  }

  guardarTodo(todoArray) {
    return this.storage.set('todo', todoArray)
      .then(respuesta => respuesta)
      .catch(error => error);
  }

  getTodo() {
    return this.storage.get('todo')
      .then(todos => todos)
      .catch(error => error);
  }

}
