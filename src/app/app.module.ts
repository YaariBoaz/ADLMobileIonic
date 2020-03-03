import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IonicStorageModule} from '@ionic/storage';
import {SharedModule} from './shared/services/shared.module';
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import {MatExpansionModule} from '@angular/material';

const config: SocketIoConfig = {url: 'ws://192.168.0.118/ws', options: {}};

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        HttpClientModule,
        IonicStorageModule.forRoot(),
        BrowserModule,
        BrowserAnimationsModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        SharedModule,
        SocketIoModule.forRoot(config)

    ],
    providers: [
        StatusBar,
        SplashScreen,
        ScreenOrientation,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent],
    exports: []
})
export class AppModule {
}
