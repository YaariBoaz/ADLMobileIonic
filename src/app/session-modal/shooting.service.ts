import {Injectable} from '@angular/core';
import {WebsocketService} from './websocket.service';
import {INetworkAdapter} from './INetworkAdapter';
import {BehaviorSubject} from 'rxjs';
import {DrillObject} from '../tab2/tab2.page';
import {CountupTimerService} from 'ngx-timer';

@Injectable({
    providedIn: 'root'
})
export class ShootingService {


    private hits: any;
    drillFinished = false;
    state: any;
    numberOfBullersPerDrill: number;
    distanceFromCenter: number;
    splitTime: string;
    rateOfFire: number;
    counter;
    netWorkAdaptor: INetworkAdapter;
    isWifi;
    drillFinished$ = new BehaviorSubject(null);
    selectedDrill: DrillObject;
    points: number;
    lastShotTime = null;
    totalTime: any;

    constructor(private webSocketService: WebsocketService, private countupTimerService: CountupTimerService) {
        this.initStats();
        this.netWorkAdaptor = webSocketService;
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
        if (this.counter === this.numberOfBullersPerDrill) {
            this.drillFinished = true;
            this.countupTimerService.stopTimer();
            this.webSocketService.sendGateWayStop();
            this.drillFinished$.next(true);
            console.log('FINISH!!!!!!!!!!!!!!!!!');
        }

        return {x: px - 10, y: py - 10};
    }


    notifyGatewayOnTargetId(chosenTargetId) {
        this.netWorkAdaptor.initConnection(chosenTargetId);
    }


    initStats() {
        this.counter = 0;
        this.distanceFromCenter = 0;
        this.splitTime = '0:00';
        this.rateOfFire = 0;
        this.points = 0;
        this.totalTime = '0:00';
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

}
