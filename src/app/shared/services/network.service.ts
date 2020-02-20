import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Network} from '@ionic-native/network/ngx';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NetworkService {

    hasConnection = true;
    hasConnectionSubject$ = new BehaviorSubject(this.hasConnection);

    constructor(private apiService: ApiService, private network: Network) {
        this.network.onDisconnect().subscribe(() => {
            this.hasConnection = false;
            this.notifyConnectionChanged();
        });
    }

    hasInternet(): boolean {
        if (!this.hasConnection) {
            return false;
        } else {
            this.apiService.ping().subscribe(
                data => {
                   this.hasConnection = true;
                   this.notifyConnectionChanged();
                },
                error => {
                    this.hasConnection = false;
                    this.notifyConnectionChanged();
                }
            );
        }
    }

    notifyConnectionChanged() {
        this.hasConnectionSubject$.next(this.hasConnection);

    }
}
