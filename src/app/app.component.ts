import {Component} from '@angular/core';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {TabsPage} from './tabs/tabs.page';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {


    splash = true;
    secondPage = TabsPage;
    tabBarElement: any;


    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private screenOrientation: ScreenOrientation
    ) {
        this.initializeApp();

    }


    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.statusBar.overlaysWebView(false);
            this.splashScreen.hide();
            this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
        });
    }
}
