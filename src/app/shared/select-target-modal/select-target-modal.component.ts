import {Component, OnInit} from '@angular/core';
import {ShootingService} from '../session-modal/shooting.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';

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

    constructor(private http: HttpClient, private storage: Storage, private shootingService: ShootingService, private router: Router) {
        if (!this.shootingService.getBaseUrl()) {
            this.storage.get('ip').then((data) => {
                if (!data) {
                    alert('You did not enter host, You will be routed to the IP page');
                    this.router.navigateByUrl('/home/tabs/tab3');
                } else {
                    this.shootingService.setBaseUrl(data);
                    this.shootingService.setTargetsI();
                }
            });
        } else {
            this.targets = this.shootingService.targets;
        }
    }

    ngOnInit() {
        this.shootingService.targetsArrived.subscribe((data) => {
            if (data) {
                this.targets = data;
            } else {
                alert('Check your internet connection or the IP you entered');
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

    onBackPressed() {
        this.router.navigateByUrl('/home/tabs/tab2');
    }

    onGetTargets() {
        this.shootingService.setTargetsI();
    }
}
