import {Injectable} from '@angular/core';
import {INetworkAdapter} from './INetworkAdapter';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import * as signalr from '@aspnet/signalr';
import {ShootingService} from './shooting.service';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService implements INetworkAdapter {

    static BASE_URL = 'http://172.20.10.11:8089';
    static GET_TARGETS_API = 'GetTargets';

    hubConnection;
    proxy;
    shotArrived$ = new BehaviorSubject(null);

    constructor(private http: HttpClient) {
    }

    initConnection(chosenTarget) {
        this.hubConnection = new signalr.HubConnectionBuilder()
            .withUrl(WebsocketService.BASE_URL + '/TargetHub')
            .build();

        this.hubConnection.start().then(() => {
            this.hubConnection.invoke('start', chosenTarget)
                .done((directResponse) => {

                }).fail(() => {
                console.warn('Something went wrong when calling server, it might not be up and running?');
            });
        }).catch(err => console.log('Error while starting connection: ' + err));

        this.subscribeToUpdates();
        this.subscribeConnectionIssues();
        this.subscribeConnectionError();

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

    subscribeConnectionIssues() {
        this.hubConnection.connectionSlow(() => {
            console.log('We are currently experiencing difficulties with the connection.');
        });
    }

    subscribeConnectionError() {
        this.hubConnection.error((error) => {
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
