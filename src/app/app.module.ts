import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicStorageModule } from '@ionic/storage';
import { AmdModule } from './amd.module';

import { ModalNewchatPage } from './pages/modal-newchat/modal-newchat.page';

@NgModule({
  declarations: [
    AppComponent,
    ModalNewchatPage
  ],
  entryComponents: [ModalNewchatPage],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(),
    AppRoutingModule, 
    AmdModule,
    BrowserAnimationsModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
