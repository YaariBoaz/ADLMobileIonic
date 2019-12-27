import {Injectable} from '@angular/core';
import {INetworkAdapter} from './INetworkAdapter';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import * as signalR from '@aspnet/signalr';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';


@Injectable({
    providedIn: 'root'
})
export class WebsocketService implements INetworkAdapter {

    //static BASE_URL = '192.168.43.86:8089';
    static BASE_URL = '10.0.0.8:8089';
    static GET_TARGETS_API = 'GetTargets';
    myWebSocket: WebSocketSubject<any> = webSocket('ws://' + WebsocketService.BASE_URL);
    hubConnection;
    proxy;
    shotArrived$ = new BehaviorSubject(null);

    constructor(private http: HttpClient) {


    }

    initConnection(chosenTarget) {
        const socket = new WebSocket('ws://' + WebsocketService.BASE_URL);

        socket.onopen = (e) => {
            console.log('[open] Connection established');
            socket.send('My name is John');
        };


        socket.onmessage = (event) => {
            console.log(`[message] Data received from server: ${event.data}`);
            this.shotArrived$.next(event.data);
        };

        socket.onclose = (event) => {
            if (event.wasClean) {
                alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
            } else {
                // e.g. server process killed or network down
                // event.code is usually 1006 in this case
                alert('[close] Connection died');
            }
        };

        socket.onerror = (error) => {
            alert(`[error] ${error}`);
        };


    }

    subscribeToUpdates() {
        this.hubConnection.on('update', (argOne) => {
            if (argOne) {
                const arr = argOne.split(',');
                if (arr[0] === 'S') {
                    this.shotArrived$.next({x: arr[1], y: arr[2]});
                } else if (arr[0] === 'B') {

                }
            }
        });
    }

    subscribeConnectionError() {
        this.hubConnection.on('error', (error) => {
            const errorMessage = error.message;
            let detailedError = '';
            if (error.source && error.source._response) {
                detailedError = error.source._response;
            }
            if (detailedError === 'An SSL error has occurred and a secure connection to the server cannot be made.') {
            }
            // tslint:disable-next-line:no-console
            console.debug('SignalR error: ' + errorMessage, detailedError);
        });
    }

    sendGateWayStop() {
        this.hubConnection.stop();
    }

    getOnlineTargets(): Observable<any> {
        return this.http.get(WebsocketService.BASE_URL + '/api/' + +WebsocketService.GET_TARGETS_API);
    }

}
