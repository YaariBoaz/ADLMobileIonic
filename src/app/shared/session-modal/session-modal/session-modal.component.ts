import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ShootingService} from '../../services/shooting.service';
import {countUpTimerConfigModel, timerTexts} from 'ngx-timer';
import {Screenshot} from '@ionic-native/screenshot/ngx';
import {ModalController, Platform} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {HttpClient} from '@angular/common/http';
import {INetworkAdapter} from '../INetworkAdapter';
import {CountupTimerService} from 'ngx-timer';
import {DrillObject} from '../../../tab2/tab2.page';

@Component({
    selector: 'app-session-modal',
    templateUrl: './session-modal.component.html',
    styleUrls: ['./session-modal.component.scss'],
})
export class SessionModalComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

    @Input() isHistory = false;
    @Input() historyDrill: DrillObject;
    @ViewChild('container', {static: false}) container: ElementRef;
    @ViewChild('screen', {static: false}) screen: ElementRef;
    @ViewChild('canvas', {static: false}) canvas: ElementRef;
    @ViewChild('downloadLink', {static: false}) downloadLink: ElementRef;
    shots = [];
    drill: DrillObject;
    testConfig: any;
    sharedData;

    BASE_URL = '192.168.0.86';
    socket: WebSocket;

    drillFinished = false;
    state: any;
    numberOfBullersPerDrill: number;
    distanceFromCenter: number;
    splitTime: string;
    rateOfFire: number;
    counter;
    netWorkAdaptor: INetworkAdapter;
    points: number;
    lastShotTime = null;
    totalTime: any;
    height: number;
    width: number;
    private chosenTarget: any;


    constructor(private shootingService: ShootingService,
                private screenshot: Screenshot,
                private storage: Storage,
                public modalController: ModalController,
                private http: HttpClient,
                public countupTimerService: CountupTimerService
    ) {
        this.drill = this.shootingService.selectedDrill;
        this.countupTimerService.stopTimer();
        this.countupTimerService.setTimervalue(0);
        this.testConfig = new countUpTimerConfigModel();

        // custom class
        this.testConfig.timerClass = 'test_Timer_class';

        // timer text values
        this.testConfig.timerTexts = new timerTexts();
        this.testConfig.timerTexts.hourText = ':'; // default - hh
        this.testConfig.timerTexts.minuteText = ':'; // default - mm
        this.testConfig.timerTexts.secondsText = ' '; // default - ss
        if (this.shootingService.BaseUrl) {
            this.BASE_URL = this.shootingService.getBaseUrl();
        }
    }


    ngOnInit() {
        this.initConnection(this.shootingService.chosenTarget);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.isHistory) {
            this.isHistory = changes.isHistory.currentValue;
        }
        if (changes && changes.historyDrill) {
            this.historyDrill = changes.historyDrill.currentValue;
        }
    }


    onShotArrived(data) {
        if (data) {
            if (data[0] === 'S') {
                if (!this.height || !this.width) {
                    this.width = this.container.nativeElement.offsetWidth;
                    this.height = this.container.nativeElement.offsetHeight;
                }
                const x = data.split(',')[1];
                const y = data.split(',')[2];
                const result = this.handelShoot(this.height, this.width, {x, y});
                this.shots.push(result);
            } else if (data[0] === 'B') {

            } else {
            }
        }
    }

    ngAfterViewInit(): void {
    }

    async share() {

    }

    private onError(error) {
        console.log(error);
    }

    private onSuccess(success) {
        console.log(success);
    }

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            // tslint:disable-next-line:triple-equals no-bitwise
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    ngOnDestroy() {
        this.socket.close();
        console.log('[OnDestroy] Session Component');
    }

    onStopSession() {
        this.socket.close();
    }

    restartSession() {
        this.socket.close();
        this.shots = [];
        this.initConnection(this.chosenTarget);
        this.initStats();
    }

    private takeScreenShot(imageId) {
        this.screenshot.save('jpg', 80, imageId).then((data) => {
            const d = JSON.stringify(data);
        });
    }

    initConnection(chosenTarget) {
        this.chosenTarget = chosenTarget;
        if (this.shootingService.BaseUrl) {
            this.BASE_URL = this.shootingService.getBaseUrl();
        }
        this.socket = new WebSocket('ws://' + this.BASE_URL + ':8089');
        this.socket.onopen = (e) => {
            console.log('[open] Connection established');
            this.socket.send(this.shootingService.chosenTarget);
        };
        this.socket.onmessage = (event) => {
            console.log(`[message] ${event.data}`);
            this.onShotArrived(event.data);
        };
        this.socket.onclose = (event) => {
            if (event.wasClean) {

            } else {
                // e.g. server process killed or network down
                // event.code is usually 1006 in this case
            }
        };
        this.socket.onerror = (error) => {
        };
    }


    handelShoot(parentImageHeight, parentImageWidth, data): { x: any, y: any } {
        if (this.counter === 0) {
            this.countupTimerService.startTimer();
        }
        const x = data.x;
        const y = data.y;

        const width = parentImageWidth;
        const height = parentImageHeight;


        const deltaX = width / 8;
        const deltaY = height / 8;


        const normalizeX = x / 8;
        const normalizeY = y / 8;


        const px = deltaX * normalizeX;
        let py = deltaY * normalizeY;
        py = py - deltaY;


        this.updateStats(x, y);


        // tslint:disable-next-line:radix
        if (this.counter === this.shootingService.numberOfBullersPerDrill) {
            this.drillFinished = true;
            this.countupTimerService.stopTimer();
            this.socket.close();
            console.log('FINISH!!!!!!!!!!!!!!!!!');
        }

        return {x: px - (px * 0.2), y: py + 5};
    }

    notifyGatewayOnTargetId(chosenTargetId) {
        this.netWorkAdaptor.initConnection(chosenTargetId);
    }

    initStats() {
        console.log('This is in the init stats of the session');
        this.drillFinished = false;
        this.counter = 0;
        this.distanceFromCenter = 0;
        this.splitTime = '0:00';
        this.rateOfFire = 0;
        this.points = 0;
        this.totalTime = '0:00';
        this.countupTimerService.stopTimer();
        this.countupTimerService.setTimervalue(0);
        this.shots = [];
    }

    updateStats(x, y) {
        this.counter++;
        console.log('counter:', this.counter);
        const currentdist: number = parseFloat(this.calculateBulletDistanceFromCenter(x, y).toFixed(2));
        this.points += this.calcScore(currentdist);
        this.distanceFromCenter = parseFloat(((this.distanceFromCenter + currentdist) / this.counter).toFixed(2));
        if (!this.lastShotTime) {
            this.lastShotTime = new Date();
        }
        this.totalTime = (this.totalTime + ((new Date().getTime() - this.lastShotTime.getTime()) / 1000));
        this.lastShotTime = new Date();

        this.splitTime = (this.countupTimerService.totalSeconds / this.counter).toFixed(2);
    }

    calculateBulletDistanceFromCenter(xT, yT): number {
        // Calculate distance from center:
        // Get number of sensor on the X axis:
        let xSensorNumber = -1.0;
        let xDistanceFromCenter = -1.0;
        if (xT % 8 === 0) {
            xSensorNumber = xT / 8.0;
            if (xSensorNumber <= 4) {
                xDistanceFromCenter = Math.abs(xSensorNumber - 4) * 3.6 + 3.6 / 2;
            } else {
                xDistanceFromCenter = Math.abs(xSensorNumber - 4) * 3.6 - 3.6 / 2;
            }

        } else if (xT % 4 === 0) {
            xSensorNumber = Math.floor(xT / 8.0);
            xDistanceFromCenter = Math.abs(xSensorNumber - 4) * 3.6;
        } else {
            // Resh:
            xSensorNumber = Math.round(xT / 8.0);
            if (xT < 8.0 * xSensorNumber) {
                if (xSensorNumber <= 4) {
                    xDistanceFromCenter = 1 + Math.abs(xSensorNumber - 4) * 3.6 + 3.6 / 2;
                } else {
                    xDistanceFromCenter = Math.abs(xSensorNumber - 4) * 3.6 + 3.6 / 2 - 1;
                }
            } else {
                if (xSensorNumber <= 4) {
                    xDistanceFromCenter = Math.abs(xSensorNumber - 4) * 3.6 + 3.6 / 2 - 1;
                } else {
                    xDistanceFromCenter = Math.abs(xSensorNumber - 4) * 3.6 + 3.6 / 2 + 1;
                }

            }
        }
        let ySensorNumber = -1.0;
        let yDistanceFromCenter = -1.0;
        if (yT % 8 === 0) {
            ySensorNumber = yT / 8.0;
            if (ySensorNumber <= 4) {
                yDistanceFromCenter = Math.abs(ySensorNumber - 4) * 3.6 + 3.6 / 2;
            } else {
                yDistanceFromCenter = Math.abs(ySensorNumber - 4) * 3.6 - 3.6 / 2;
            }

        } else if (yT % 4 === 0) {
            ySensorNumber = Math.floor(yT / 8.0);
            yDistanceFromCenter = Math.abs(ySensorNumber - 4) * 3.6;
        } else {
            // Resh:
            Math.round(yT / 8.0);
            if (yT < 8.0 * ySensorNumber) {
                if (ySensorNumber <= 4) {
                    yDistanceFromCenter = 1 + Math.abs(ySensorNumber - 4) * 3.6 + 3.6 / 2;
                } else {
                    yDistanceFromCenter = Math.abs(ySensorNumber - 4) * 3.6 + 3.6 / 2 - 1;
                }
            } else {
                if (ySensorNumber <= 4) {
                    yDistanceFromCenter = Math.abs(ySensorNumber - 4) * 3.6 + 3.6 / 2 - 1;
                } else {
                    yDistanceFromCenter = Math.abs(ySensorNumber - 4) * 3.6 + 3.6 / 2 + 1;
                }

            }
        }

        if (xSensorNumber <= 4) {
            xDistanceFromCenter = -1 * xDistanceFromCenter;
        }

        if (ySensorNumber <= 4) {
            yDistanceFromCenter = -1 * yDistanceFromCenter;
        }
        return Math.sqrt(Math.pow(xDistanceFromCenter, 2) + Math.pow(yDistanceFromCenter, 2));

    }

    calcScore(dis) {
        if (dis < 5) {
            return 1;
        } else if (dis >= 5 && dis < 10) {
            return 2;
        } else if (dis >= 10 && dis < 15) {
            return 3;
        } else if (dis >= 15 && dis < 20) {
            return 4;
        } else if (dis >= 20 && dis < 25) {
            return 5;
        } else {
            return 6;
        }
    }

    onBackPressed() {
        this.socket.close();
        this.initStats();
    }

    ionViewDidLoad() {
        console.log('In ionViewDidLoad()');
    }

    ionViewWillEnter() {
        this.drill = this.shootingService.selectedDrill;
        this.countupTimerService.stopTimer();
        this.countupTimerService.setTimervalue(0);
        this.initStats();
    }

    ionViewDidLeave() {
        this.socket.close();
        console.log('[OnDestroy] Session Component');
    }

    ionViewWillUnload() {
        console.log('In ionViewWillUnload()');
    }

    stopAndShare() {
        this.drillFinished = true;
    }
}
