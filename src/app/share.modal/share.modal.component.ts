import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-share.modal',
    templateUrl: './share.modal.component.html',
    styleUrls: ['./share.modal.component.scss'],
})
export class ShareModalComponent implements OnInit {
    instagram: any;
    facebook: any;
    email: any;
    phoneNumber: any;

    constructor(public modalController: ModalController) {
    }

    ngOnInit() {
    }

    onSave() {
        const shareData = {
            instagram: this.instagram,
            facebook: this.facebook,
            email: this.email,
            phoneNumber: this.phoneNumber
        };
        this.modalController.dismiss({data: shareData});
    }
}
