import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { TodoProvider } from '../../providers/todo/todo';
import { HomePage } from '../home/home';
import { TodoFormPage } from '../todo-form/todo-form';
import { DetallePage } from '../detalle/detalle';

@Component({
  selector: 'page-to-do',
  templateUrl: 'to-do.html',
})
export class ToDoPage {

  toDos=[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private todoProvider: TodoProvider,
    private actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    this.getToDos();
  }

  ionViewWillEnter(){
    this.getToDos();
  }

  getToDos(refresher?) {

    // LLAMAMOS AL METODO DE NUESTRO SERVICE QUE NOS DEVUELVE TODOS LOS TODOS
    this.todoProvider.get()
      .subscribe(response => {
        this.toDos = response;
        // if (this.idTodo) {
        //   // EN CASO DE QUE TENGAMOS UN PARAMETRO POR URL FILTRAMOS NUESTRO ARRAY
        //   this.toDos = this.toDos.filter(x => x.id === this.idTodo);
        // }
        if(refresher){
          refresher.complete();
        }
      }, error => {
        console.log(error);
        if (refresher) {
          refresher.complete();
        }
      });
  }

  itemSelected(item_todo){
    this.navCtrl.push(HomePage, item_todo);
  }

  insertar(){
    this.navCtrl.push(TodoFormPage);
  }

  presentarAction(model){
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Elige una accion',
      buttons: [
        {
          text: 'Ver detalles',
          handler: () => {
            this.navCtrl.push(DetallePage, {datos: model, titulo: 'Detalles'});
          }
        }, {
          text: 'Modificar',
          handler: () => {
            this.navCtrl.push(TodoFormPage, { datos: model });
          }
        }, {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // actionSheet.dismiss();
          }
        }
      ]
    });
    actionSheet.present();
  }

}
