import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-share.modal',
    templateUrl: './share.modal.component.html',
    styleUrls: ['./share.modal.component.scss'],
})
export class ShareModalComponent implements OnInit {

    email: any;
    fullName: any;

    constructor(public modalController: ModalController) {
    }

    ngOnInit() {
    }


    onSave() {
        const shareData = {
            email: this.email,
            fullName: this.fullName
        };
        this.modalController.dismiss({data: shareData});
    }

    moveFocus(nextElement) {
        nextElement.focus();
    }
}
