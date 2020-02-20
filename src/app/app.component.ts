import {Component} from '@angular/core';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {TabsPage} from './tabs/tabs.page';
import {NetworkService} from './shared/services/network.service';
import {StorageService} from './shared/services/storage.service';
import {DashboardModel} from './shared/models/dashboard-model';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {


    splash = true;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private screenOrientation: ScreenOrientation,
        private netWorkService: NetworkService,
        private  storageService: StorageService) {
        this.initializeApp();
    }


    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.statusBar.overlaysWebView(false);
            this.splashScreen.hide();
            this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
            this.netWorkService.hasInternet();
            this.setFakeData();
        });
    }

    setFakeData() {
        this.storageService.setItem('homeData', {
                hitRatioChart: {data: [[65, 35]]},
                rateOfFireChart: {
                    chartData: {data: [65, 76, 88, 45]},
                    chartLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
                },
                trainingHistory: [
                    {
                        date: '26.7.2002',
                        day: 'Tuesday',
                        numberOfDrills: 6,
                        drillType: 'Zero',
                        hits: 12,
                        totalShots: 16,
                        range: 50,
                        timeLimit: 34,
                        points: 6,
                        recommendation: 'Go Fuck Yourslef'
                    },
                    {
                        date: '28.7.2002',
                        day: 'Tuesday',
                        numberOfDrills: 6,
                        drillType: 'Hostage',
                        hits: 12,
                        totalShots: 16,
                        range: 50,
                        timeLimit: 34,
                        points: 6,
                        recommendation: 'Go Fuck Yourslef'
                    }],
                bestScores: {
                    longestShot: 1250,
                    avgSplit: 2.5,
                    avgDistance: 3,
                    lastShooting: new Date()
                }
            }
        );
    }
}
