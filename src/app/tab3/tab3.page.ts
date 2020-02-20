import {Component, OnInit} from '@angular/core';
import {StorageService} from '../shared/services/storage.service';


@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

    profile;
    images;
    index = 0;
    ip: any;
    isGunList = false;
    isSightList = false;

    myGuns = null;
    mySights = null;
    myTargets = null;

    constructor(private storageService: StorageService) {
    }

    ionViewDidEnter() {
        this.profile = this.storageService.getItem('profileData');
        this.myGuns = this.storageService.getItem('gunList');
        this.mySights = this.storageService.getItem('sightList');
        // this.myTargets = this.storageService.getItem('myTargets');
        if (!this.profile) {
            this.profile = {};
        }
    }

    ngOnInit(): void {

    }


    // shareEmail(item) {
    //     const body = ' Dear ' + item.data.fullName + '.' + '\r\n' +
    //         'It was great fun shooting with you at the range.' + '\r\n' +
    //         'We attached your session from today for you to keep, share and see our capabilities.' + '\r\n' +
    //         'Please visit our website ( https://www.adlsmartshooting.com/ ) and contact us for any more questions.' + '\r\n' +
    //         'don\'t forget to follow us on Instagram and tag @adlontarget' + '\r\n' +
    //         'Best regards.';
    //
    //     this.storage.get('adl-contacts').then((storageData) => {
    //         this.emailComposer.isAvailable().then((available: boolean) => {
    //             if (available) {
    //                 const email = {
    //                     to: item.data.email,
    //                     subject: 'Your results from ADL Smart Shooting Target',
    //                     body,
    //                     attachments: [
    //                         item.urlForUpload
    //                     ],
    //                 };
    //
    //                 this.emailComposer.open(email);
    //             }
    //         });
    //     });
    // }

    // shareInstagram(item) {
    //     this.socialSharing.shareViaInstagram('Hello', item.urlForUpload).then(() => {
    //
    //     }).catch((e) => {
    //         alert(e);
    //         // Sharing via email is not possible
    //     });
    //
    // }
    //
    // shareFacebook(item) {
    //     this.socialSharing.shareViaFacebook('This is My Shots..', item.urlForUpload, item.urlForUpload).then(() => {
    //
    //     });
    // }

    onRefresh() {

    }

    onSelectWeapons() {
        this.isGunList = true;
    }

    onHidetWeapons() {
        this.isGunList = false;
        this.myGuns = this.storageService.getItem('gunList');
    }

    onSelectSights() {
        this.isSightList = true;
    }

    onHideSights() {
        this.isSightList = false;
        this.mySights = this.storageService.getItem('sightList');

    }


}

