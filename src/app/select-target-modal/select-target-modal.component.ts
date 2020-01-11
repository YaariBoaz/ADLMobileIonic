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
    targets = [];
    BASE_URL_HTTP = '192.168.0.86:8087';
    socket;
    GET_TARGETS_API;

    constructor(private http: HttpClient, private shootingService: ShootingService) {
        if (!this.shootingService.getBaseUrl()) {
            alert('You did not enter host, Please got to settings and enter host');
        } else {
            this.targets = this.shootingService.targets;
        }
    }

    ngOnInit() {
        this.shootingService.targetsArrived.subscribe((data) => {
            if (data) {
                this.targets = data;
            }
        });
    }

    getOnlineTargets() {
        this.http.get(this.GET_TARGETS_API).subscribe((data: any) => {
            this.targets = data;
        });
    }


    onTargetChosen(target) {
        this.shootingService.chosenTarget = target;
    }
}
