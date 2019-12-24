import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WebsocketService} from './websocket.service';
import {INetworkAdapter} from './INetworkAdapter';

@Injectable({
    providedIn: 'root'
})
export class ShootingService {


    private hits: any;
    drillFinished: boolean;
    private state: any;
    private numberOfBullersPerDrill: number;
    private distanceFromCenter: number;
    private splitTime: number;
    private rateOfFire: number;
    private counter;
    netWorkAdaptor: INetworkAdapter;
    isWifi;

    constructor(private  http: HttpClient, private webSocketService: WebsocketService) {
        this.netWorkAdaptor = webSocketService;
    }

    setIsWIFI(flag) {
        this.isWifi = flag;
    }


    handelShoot() {
        this.netWorkAdaptor.shotArrived$.subscribe((data) => {
            const x = data.x;
            const y = data.y;

            const width = this.state.parentImageWidth;
            const height = this.state.parentImageHeight;
            console.log('imageX', width);
            console.log('imageY', height);


            const deltaX = width / 8;
            const deltaY = height / 8;


            console.log('deltaX', deltaX);
            console.log('deltaY', deltaY);


            const normalizeX = x / 8;
            const normalizeY = y / 8;

            console.log('normalizeX', normalizeX);
            console.log('normalizeY', normalizeY);

            const px = deltaX * normalizeX;
            let py = deltaY * normalizeY;
            py = py - deltaY;
            console.log('px', px);
            console.log('py', py);

            this.hits.push({key: this.counter.toString(), x: this.state.parentImageWidth - px, y: py});
            this.updateStats(x, y);
            console.log('this.state.numOfBullets', this.state.numOfBullets);
            console.log('this.state.counter', this.state.counter);


            // tslint:disable-next-line:radix
            if (this.state.counter === parseInt(this.state.numOfBullets)) {
                this.drillFinished = true;
                this.sendGateWayStop();
            }
        });

    }


    notifyGatewayOnTargetId(chosenTargetId) {
        this.netWorkAdaptor.initConnection(chosenTargetId);
    }


    initStats() {
        this.counter = 0;
        this.numberOfBullersPerDrill = 0;
        this.distanceFromCenter = 0;
        this.splitTime = 0;
        this.rateOfFire = 0;
    }


    private updateStats(x: any, y: any) {

    }
}
