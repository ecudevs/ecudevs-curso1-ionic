import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { TodoProvider } from '../../providers/todo/todo';

@Component({
  selector: 'page-todo-form',
  templateUrl: 'todo-form.html',
})
export class TodoFormPage {

  model: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private todoProvider: TodoProvider,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController) {
    this.model = this.navParams.data.datos;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodoFormPage');
  }

  agregar() {

    if (this.model._id) {
      this.presentConfirm();
      return;
    }

    this.guardar();
  }

  guardar() {
    let loading = this.loadingCtrl.create({
      content: 'Espere por favor...'
    });

    loading.present();

    let toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000,
      position: 'bottom'
    });

    this.todoProvider.insertar(this.model)
      .subscribe(response => {
        console.log(response);
        this.navCtrl.pop();
        loading.dismiss();
        toast.setMessage('Guardado correctamente.');
        toast.present();
      }, error => {
        console.log(error);
        loading.dismiss();
        toast.setMessage('Hubo un error al guardar.');
        toast.present();
      });
  }

  actualizar() {
    let loading = this.loadingCtrl.create({
      content: 'Espere por favor...'
    });

    loading.present();

    let toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000,
      position: 'bottom'
    });

    this.todoProvider.actualizar(this.model)
      .subscribe(response => {
        console.log(response);
        this.navCtrl.pop();
        loading.dismiss();
        toast.setMessage('Guardado correctamente.');
        toast.present();
      }, error => {
        console.log(error);
        loading.dismiss();
        toast.setMessage('Hubo un error al guardar.');
        toast.present();
      });
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Conformacion',
      message: 'Esta seguro de modificar el registro?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Si',
          handler: () => {
            this.actualizar();
          }
        }
      ]
    });
    alert.present();
  }

}
