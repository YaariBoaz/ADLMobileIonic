import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';

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

    constructor(private storage: Storage) {
    }

    ngOnInit() {
    }

    onSave() {
        const self = this;
        this.storage.get('shots').then((val) => {
            console.log(val);
            if (!val) {
                val = [];
            }
            val.push({
                instagram: this.instagram,
                facebook: this.facebook,
                email: this.email,
                phoneNumber: this.phoneNumber
            });

            this.storage.set('shots', val);
        });
    }
}
