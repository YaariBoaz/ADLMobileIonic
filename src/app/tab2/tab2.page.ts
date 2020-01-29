import {Component} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Screenshot} from '@ionic-native/screenshot/ngx';
import {ShootingService} from '../session-modal/shooting.service';
import {AlertController} from '@ionic/angular';


@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    sliderTwo =
        {
            isBeginningSlide: true,
            isEndSlide: false,
            slidesItems: [
                {
                    id: 6,
                    image: '../../assets/icons/Zero.png',
                },
                {
                    id: 7,
                    image: '../../assets/icons/Hostage.png',
                },
                {
                    id: 8,
                    image: '../../assets/icons/Zero.png',
                },
                {
                    id: 9,
                    image: '../../assets/icons/bullseye_red.png',
                },
            ]
        };
s

    slideOptsTwo = {
        initialSlide: 1,
        slidesPerView: 2,
        loop: true,
        centeredSlides: true
    };

    drill: DrillObject = {
        numOfBullets: 5,
        weapon: 'Bergara HMR Pro',
        range: 150,
        rangeUOM: 'Meters',
        sight: 'V6 5-30 X 50',
        ammo: 'Creedmor 6.5'
    };
    wifiSsid;

    constructor(public modalController: ModalController,
                public alertController: AlertController,
                private  shootingService: ShootingService,
                private screenshot: Screenshot) {

    }

    SlideDidChange(object, slideView) {
        this.checkIfNavDisabled(object, slideView);
    }


    checkIfNavDisabled(object, slideView) {
        this.checkisBeginning(object, slideView);
        this.checkisEnd(object, slideView);
    }

    checkisBeginning(object, slideView) {
        slideView.isBeginning().then((istrue) => {
            object.isBeginningSlide = istrue;
        });
    }

    checkisEnd(object, slideView) {
        slideView.isEnd().then((istrue) => {
            object.isEndSlide = istrue;
        });
    }


    startSesstion() {
        this.shootingService.selectedDrill = this.drill;
        this.shootingService.numberOfBullersPerDrill = this.drill.numOfBullets;
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
}
