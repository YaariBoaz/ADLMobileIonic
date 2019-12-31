import {Injectable} from '@angular/core';
import {INetworkAdapter} from './INetworkAdapter';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import * as signalR from '@aspnet/signalr';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {ShootingService} from './shooting.service';


@Injectable({
    providedIn: 'root'
})
export class WebsocketService implements INetworkAdapter {

    // static BASE_URL = '192.168.43.86:8089';
    static BASE_URL = '172.20.10.8:8089';
    //  static BASE_URL = '10.0.0.6:8089';

    static GET_TARGETS_API = 'GetTargets';
    socket: WebSocket;
    shotArrived$ = new BehaviorSubject(null);

    constructor(private http: HttpClient) {


    }

    initConnection(chosenTarget) {
        this.socket = new WebSocket('ws://' + WebsocketService.BASE_URL);

        this.socket.onopen = (e) => {
            console.log('[open] Connection established');
            this.socket.send('My name is John');
        };


        this.socket.onmessage = (event) => {
            console.log(`[message] Data received from server: ${event.data}`);
            this.shotArrived$.next(event.data);
        };

        this.socket.onclose = (event) => {
            if (event.wasClean) {
                alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
            } else {
                // e.g. server process killed or network down
                // event.code is usually 1006 in this case
                alert('[close] Connection died');
            }
        };

        this.socket.onerror = (error) => {
            alert(`[error] ${error}`);
        };


    }

    sendGateWayStop() {
        this.socket.close();
        console.log('Closed Webthis.socket');
    }

    getOnlineTargets(): Observable<any> {
        return this.http.get(WebsocketService.BASE_URL + '/api/' + +WebsocketService.GET_TARGETS_API);
    }

}
