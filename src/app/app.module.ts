import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IonicStorageModule} from '@ionic/storage';
import {ShootingService} from './session-modal/shooting.service';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [HttpClientModule, IonicStorageModule.forRoot(),
        BrowserModule, BrowserAnimationsModule, IonicModule.forRoot(), AppRoutingModule],
    providers: [
        StatusBar,
        SplashScreen,
        ShootingService,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
