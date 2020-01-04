import {Component, OnInit} from '@angular/core';
import {ShootingService} from '../session-modal/shooting.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-select-target-modal',
    templateUrl: './select-target-modal.component.html',
    styleUrls: ['./select-target-modal.component.scss'],
})
export class SelectTargetModalComponent implements OnInit {
    targets = [11];
    BASE_URL_HTTP = '192.168.0.86:8087';
    GET_TARGETS_API = 'http://' + this.BASE_URL_HTTP + '/api/GetTargets';
    BASE_URL = '192.168.0.86:8089';
    socket;


    constructor(private http: HttpClient, private shootingService: ShootingService) {
    }

    ngOnInit() {
        // this.getOnlineTargets().subscribe(data => {
        //     if (data) {
        //         this.targets = JSON.parse(data);
        //     }
        // });
    }

    getOnlineTargets(): Observable<any> {
        return this.http.get(this.GET_TARGETS_API);
    }

    testWebSocket() {
        this.socket = null;
        this.socket = new WebSocket('ws://' + this.BASE_URL);
        this.socket.onopen = (e) => {
            console.log('[open] Connection established');
            this.socket.send('11');
        };
        this.socket.onmessage = (event) => {
            console.log(`[message] ${event.data}`);
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
            alert('[error] ' + JSON.stringify(error, ['message', 'arguments', 'type', 'name']));
        };
    }
}
