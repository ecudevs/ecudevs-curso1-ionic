import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { TodoProvider } from '../../providers/todo/todo';
import { HomePage } from '../home/home';
import { TodoFormPage } from '../todo-form/todo-form';
import { DetallePage } from '../detalle/detalle';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';

@Component({
  selector: 'page-to-do',
  templateUrl: 'to-do.html',
})
export class ToDoPage {

  toDos = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private todoProvider: TodoProvider,
    private actionSheetCtrl: ActionSheetController,
    private localstorage: LocalStorageProvider) {
  }

  ionViewDidLoad() {
    this.getToDos();
  }

  ionViewWillEnter() {
    this.getToDos();
  }

  // A ESTE METODO LLEGA COMO PARAMETRO OPCIONAL UN
  // OBJETO DE CLASE REFRESHER, CON ESTE OBJETO CONTROLAMOS
  // EL ELEMENTO REFRESHER DE MI VISTA
  // MAS INFO https://ionicframework.com/docs/api/components/refresher/Refresher/
  getToDos(refresher?) {

    // LLAMAMOS AL METODO DE NUESTRO SERVICE QUE NOS DEVUELVE TODOS LOS TODOS
    this.todoProvider.get()
      .subscribe(response => {
        this.toDos = response;
        if (refresher) {
          // EN CASO DE QUE refresher VENGA COMO PARAMETRO
          // LLAMAMOS A SU METODO complete() PARA DEJAR DE HACER
          // EL EFECTO DE LOADING
          refresher.complete();
        }
      }, error => {

        if (refresher) {
          refresher.complete();
        }
        
        // EN CASO DE QUE NO LOGREMOS CONECTARNOS CON EL SERVIDOR
        // VAMOS A RETORNAR LOS DATOS LOCALES, DESDE EL METODO CREADO
        // EN NUESTRO SERVICE
        this.localstorage.getTodo().then(todos => {
          this.toDos = todos;
        }).catch(error => {
          console.log(error);
        })
      });
  }

  insertar() {
    // CUANDO PRESIONEMOS EL FAB BUTTON DE MI VISTA
    // HACEMOS UN PUSH DE NUESTRO COMPONENTE FORMULARIO
    // PARA PODER MOSTRARLO COMO VISTA ACTIVA
    this.navCtrl.push(TodoFormPage);
  }

  presentarAction(model) {
    // LA CREACION DE UN ACTIONSHEET SE HACE DE ESTA MANERA,
    // ES UN ARREGLO DE BOTONES, CON SU TITULO Y LA ACCION A EJECUTAR EN EL CLICK
    // MAS INFO https://ionicframework.com/docs/components/#action-sheets
    // https://ionicframework.com/docs/api/components/action-sheet/ActionSheetController/
    // PRIMERO LO CREAMOS
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Elige una accion',
      buttons: [
        {
          text: 'Ver detalles',
          handler: () => {
            // EN CASO DE QUE ELIJA LA OPCION VER DETALLES MOSTRAMOS LA PAGINA DE DETALLES
            // ENVIADO COMO PARAMETROS A LA NUEVA VISTA, NUESTRO MODELO DE DATOS Y EL TITULO
            // PARA QUE ESTOS SEAN MANEAJADOS EN DetallePage
            this.navCtrl.push(DetallePage, { datos: model, titulo: 'Detalles' });
          }
        }, {
          text: 'Modificar',
          handler: () => {
            // EN CASO DE QUE QUERAMOS EDITAR MOSTRAMOS NUESTRA PAGINA DE FORMULARIO
            // ENVIANDO COMO PARAMETRO EL REGISTRO QUE SE VA A MODIFICAR
            this.navCtrl.push(TodoFormPage, { datos: model });
          }
        }, {
          text: 'Cancelar',
          //EL ROL CANCELAR HACE UN DISMISS DE NUESTRO ACTIONSHEET
          role: 'cancel',
          handler: () => {
            // TAMBIEN PODEMOS MANEJAR UN EVENTO EN CON UN BOTON DE ROL 'cancel'
          }
        }
      ]
    });

    // LUEGO LO PRESENTAMOS
    actionSheet.present();
  }

}
