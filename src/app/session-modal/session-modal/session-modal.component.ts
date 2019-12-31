import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ShootingService} from '../shooting.service';
import {WebsocketService} from '../websocket.service';
import {countUpTimerConfigModel, timerTexts} from 'ngx-timer';
import {Screenshot} from '@ionic-native/screenshot/ngx';
import {ModalController, Platform} from '@ionic/angular';
import {ShareModalComponent} from '../../share.modal/share.modal.component';

@Component({
    selector: 'app-session-modal',
    templateUrl: './session-modal.component.html',
    styleUrls: ['./session-modal.component.scss'],
})
export class SessionModalComponent implements OnInit, AfterViewInit {

    @ViewChild('container', {static: false}) container: ElementRef;
    @ViewChild('screen', {static: false}) screen: ElementRef;
    @ViewChild('canvas', {static: false}) canvas: ElementRef;
    @ViewChild('downloadLink', {static: false}) downloadLink: ElementRef;
    sessionIsOver = false;
    shots = [];
    drill;
    testConfig: any;
    targetWidth;
    targetHeight;

    constructor(private shootingService: ShootingService,
                private  webSocketService: WebsocketService,
                private screenshot: Screenshot,
                private platform: Platform,
                public modalController: ModalController
    ) {
        this.drill = this.shootingService.selectedDrill;

    }


    ngOnInit() {
        this.webSocketService.initConnection(11);
        this.webSocketService.shotArrived$.subscribe((data) => {
            if (data) {
                if (data[0] === 'S') {
                    const height = this.container.nativeElement.offsetHeight;

                    const width = this.container.nativeElement.offsetWidth;
                    const x = data.split(',')[1];
                    const y = data.split(',')[2];
                    this.shots.push(this.shootingService.handelShoot(height, width, {x, y}));


                } else if (data[0] === 'B') {
                    console.log(data);

                } else {
                    console.log(data);
                }
            }
        });
        this.testConfig = new countUpTimerConfigModel();

        // custom class
        this.testConfig.timerClass = 'test_Timer_class';

        // timer text values
        this.testConfig.timerTexts = new timerTexts();
        this.testConfig.timerTexts.hourText = ':'; // default - hh
        this.testConfig.timerTexts.minuteText = ':'; // default - mm
        this.testConfig.timerTexts.secondsText = ' '; // default - ss

        this.shootingService.drillFinished$.subscribe(data => {
            if (data) {

            }
        });
    }

    ngAfterViewInit(): void {
    }

    async share() {
        const modal = await this.modalController.create({
            component: ShareModalComponent
        });
        return await modal.present();
        // this.screenshot.save('jpg', 80, 'myscreenshot.jpg').then(data => {
        // });
    }

    private onError() {

    }

    private onSuccess() {

    }

}
