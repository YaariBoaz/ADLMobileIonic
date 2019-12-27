import {Component, OnInit} from '@angular/core';
import {WebsocketService} from '../session-modal/websocket.service';
import {ShootingService} from '../session-modal/shooting.service';
import {ModalController} from '@ionic/angular';
import {SessionModalComponent} from '../session-modal/session-modal/session-modal.component';

@Component({
    selector: 'app-select-target-modal',
    templateUrl: './select-target-modal.component.html',
    styleUrls: ['./select-target-modal.component.scss'],
})
export class SelectTargetModalComponent implements OnInit {
    targets = [11, 12];

    constructor(public modalController: ModalController, private  websocketService: WebsocketService, private shootingService: ShootingService) {
    }

    ngOnInit() {
        // this.websocketService.getOnlineTargets().subscribe(data => {
        //     if (data) {
        //         this.targets = data;
        //     }
        // });
    }

    async startSesstion(target) {
        const modal = await this.modalController.create({
            component: SessionModalComponent
        });
        return await modal.present();

    }
}
