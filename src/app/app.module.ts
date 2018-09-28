import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TodoProvider } from '../providers/todo/todo';
import { GlobalConfigProvider } from '../providers/global-config/global-config';
import { HttpModule } from '@angular/http';
import { ToDoPage } from '../pages/to-do/to-do';
import { DetallePage } from '../pages/detalle/detalle';
import { TodoFormPage } from '../pages/todo-form/todo-form';

import { IonicStorageModule } from '@ionic/storage';
import { LocalStorageProvider } from '../providers/local-storage/local-storage';
import { MapasPage } from '../pages/mapas/mapas';

import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ToDoPage,
    DetallePage,
    TodoFormPage,
    MapasPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    //NO OLVIDAR DECLARAR EL MODULO DE STORAGE
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ToDoPage,
    DetallePage,
    TodoFormPage,
    MapasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TodoProvider,
    GlobalConfigProvider,
    LocalStorageProvider,
    Geolocation
  ]
})
export class AppModule {}
