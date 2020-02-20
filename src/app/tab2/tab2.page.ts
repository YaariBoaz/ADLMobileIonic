import {Component, ViewChild} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Screenshot} from '@ionic-native/screenshot/ngx';
import {AlertController} from '@ionic/angular';
import {ShootingService} from '../shared/services/shooting.service';
import {StorageService} from '../shared/services/storage.service';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    @ViewChild('slides', {static: false}) slides;

    s;
    mySights;
    myGuns;
    drill: DrillObject = {
        numOfBullets: 5,
        weapon: 'Bergara HMR Pro',
        range: 150,
        rangeUOM: 'Meters',
        sight: 'V6 5-30 X 50',
        ammo: 'Creedmor 6.5',
        drillType: 'Bullseye',
        shots: new Array<{ x, y }>()
    };
    DEFAULT_WEAPONS = [
        'AR-15',
        'M4',
        'MP5',
        'DOUBLE BARREL SHOTGUN',
        'P40'
    ];
    DEFAULT_SIGHTS = [
        'Trij',
        'SLT',
        'XXX',
        'DP',
        'P40'
    ];

    constructor(public modalController: ModalController,
                public alertController: AlertController,
                private  shootingService: ShootingService,
                private screenshot: Screenshot,
                private storageService: StorageService) {
        this.mySights = this.storageService.getItem('sightList');
        this.myGuns = this.storageService.getItem('gunList');
        this.drill.weapon = this.myGuns[0];
        this.drill.sight = this.mySights[0];
        if (!this.myGuns) {

        }
        if (!this.mySights) {

        }
    }

    slideDidChange(event) {
        this.slides.getActiveIndex().then(index => {
            switch (index) {
                case 0:
                    this.drill.drillType = 'Bullseye';
                    break;
                case 1:
                    this.drill.drillType = 'Zero';
                    break;
                case 2:
                    this.drill.drillType = 'Hostage';
                    break;
            }

        });
    }


    startSesstion() {
        this.shootingService.selectedDrill = this.drill;
        this.shootingService.numberOfBullersPerDrill = this.drill.numOfBullets;
    }

    compareFn() {


    }

    async showLongRangeAlert() {
        const alert = await this.alertController.create({
            header: 'Wifi Error',
            subHeader: 'Wifi not connected to gateway',
            message: 'Please connect to long-range-target',
            buttons: ['OK']
        });

        await alert.present();
    }
}

export interface DrillObject {
    numOfBullets: number;
    weapon: string;
    range: number;
    rangeUOM: string;
    sight: string;
    ammo: string;
    drillType: string;
    shots: Array<{ x: number, y: number }>;
}
