import {Injectable} from '@angular/core';
import {WebsocketService} from './websocket.service';
import {INetworkAdapter} from './INetworkAdapter';
import {BehaviorSubject} from 'rxjs';
import {DrillObject} from '../tab2/tab2.page';

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
    drawShot$ = new BehaviorSubject(null);
    selectedDrill: DrillObject;

    constructor(private webSocketService: WebsocketService) {
        this.netWorkAdaptor = webSocketService;
    }

    setIsWIFI(flag) {
        this.isWifi = flag;
    }


    handelShoot(parentImageHeight, parentImageWidth, data): { x: any, y: any } {
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
        // if (counter === parseInt(numOfBullets)) {
        //         //     this.drillFinished = true;
        //         //     this.netWorkAdaptor.sendGateWayStop();
        //         // }

        return {x: px - 10, y: py - 10};
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
