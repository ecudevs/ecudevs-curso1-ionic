import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TodoProvider } from '../providers/todo/todo';
import { GlobalConfigProvider } from '../providers/global-config/global-config';
import { HttpModule } from '@angular/http';
import { ToDoPage } from '../pages/to-do/to-do';
import { DetallePage } from '../pages/detalle/detalle';
import { TodoFormPage } from '../pages/todo-form/todo-form';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ToDoPage,
    DetallePage,
    TodoFormPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ToDoPage,
    DetallePage,
    TodoFormPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TodoProvider,
    GlobalConfigProvider
  ]
})
export class AppModule {}
