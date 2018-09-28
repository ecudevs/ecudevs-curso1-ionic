import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class LocalStorageProvider {

  // EN ESTE PROVIDER VAMOS A MANEJAR LOS DATOS QUE SE ALMACENAN
  // DE MANERA INTERNA EN NUESTRO DISPOSITIVO
  // PARA ELLO USAMOS EL COMPONENTE DE IONIC NATIVE LLAMADO Storage
  // MAS INFO https://ionicframework.com/docs/storage/
  constructor(private storage: Storage) {
  }

  guardarTodo(todoArray) {
    // EL METODO Storage.set GUARDA LOS DATOS DE MANERA LOCAL
    // ESTE ALMACENAMIENTO ES TIPO KEY/VALUE, O CLAVE VALOR
    // PUEDES GUARDAR CUALQUIER TIPO DE DATO
    return this.storage.set('todo', todoArray)
      .then(respuesta => respuesta)
      .catch(error => error);
  }  

  getTodo() {
    // EL METODO Storage.get OBTIENE EL VALOR DE LA CLAVE QUE ENVIAMOS COMO
    // PARAMETRO
    return this.storage.get('todo')
      .then(todos => todos)
      .catch(error => error);
  }

  getTodoById(id) {
    // TAMBIEN PODEMOS IMPLEMENTAR UNA CLASE QUE ME BUSQUE EL REGISTRO POR ID
    // USANDO SIMPLES OPERACIONES DE ARREGLOS
    return this.storage.get('todo')
      .then(todos => {
        return todos.filter(x=>x._id===id);
      })
      .catch(error => error);
  }

}
