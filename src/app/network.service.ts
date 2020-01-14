import {Injectable} from '@angular/core';
import {Network} from '@ionic-native/network/ngx';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NetworkService {
    connectionStatus = new BehaviorSubject(null);
    hasInternet = false;

    constructor(private network: Network) {
        this.network.onChange().subscribe((connectionStatus) => {
            console.log('ON NETWORK CHANGE: ', connectionStatus);
            this.connectionStatus.next(connectionStatus);
        });
        this.network.onDisconnect().subscribe((onDissconnect) => {
            console.log('ON DISSCONNECT: ', onDissconnect);
            this.connectionStatus.next(onDissconnect);

        });

        this.network.onConnect().subscribe((onConnect) => {
            console.log('ON CONNECT: ', onConnect);
            this.connectionStatus.next(onConnect);
        });
    }
}
