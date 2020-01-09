import {ChangeDetectorRef, Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Platform} from '@ionic/angular';
import {PhotoLibrary} from '@ionic-native/photo-library/ngx';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {Base64} from '@ionic-native/base64/ngx';
import {CDVPhotoLibraryPipe} from './ImagePipe';
import * as json2csv from 'json2csv';
import {EmailComposer} from '@ionic-native/email-composer/ngx';
import {ShootingService} from '../session-modal/shooting.service';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
    data;
    drills: any;
    images;
    allData = [];
    index = 0;
    ip: any;

    constructor(private base64: Base64,
                private emailComposer: EmailComposer,
                private socialSharing: SocialSharing,
                private changeDetectorRef: ChangeDetectorRef,
                private storage: Storage,
                private platform: Platform,
                private shootingService: ShootingService,
                private photoLibrary: PhotoLibrary) {
        platform.ready().then(() => {
            this.photoLibrary.requestAuthorization().then(() => {
                this.callIt();
            });
        });
    }

    private callIt() {
        this.storage.get('adl-contacts').then((storageData) => {
            this.photoLibrary.getLibrary().subscribe({
                next: library => {
                    this.images = [...(library as any).library];
                    this.data = storageData;
                    this.images.forEach(image => {
                        this.data.forEach(dataItem => {
                            if (image.fileName.indexOf(dataItem.imageId) > -1) {
                                let urlShot: string;
                                if (image.id.split(';').length > 0) {
                                    urlShot = 'file://' + image.id.split(';')[1];
                                }
                                urlShot = (window as any).Ionic.WebView.convertFileSrc(urlShot);
                                this.allData.push({
                                    data: dataItem,
                                    url: urlShot,
                                    photoUrl: image,
                                    index: this.index
                                });
                            }
                            this.index++;
                            console.log(image);
                            console.log(dataItem);
                        });
                    });
                    this.changeDetectorRef.detectChanges();
                },
                error: err => {
                    alert('could not get photos');
                },
                complete: () => {
                    alert('done getting photos');
                }
            });
        });
    }

    shareIt() {
        this.storage.get('adl-contacts').then((storageData) => {
            this.emailComposer.isAvailable().then((available: boolean) => {
                if (available) {
                    const email = {
                        to: 'boazyaarii@gmail.com',
                        cc: 'boazyaarii@gmail.com',
                        subject: 'Drills',
                        body: JSON.stringify(storageData),
                        isHtml: true
                    };

                    this.emailComposer.open(email);
                }
            });
        });

        // this.allData.forEach(item => {
        //
        //     alert('After Encoding');
        //     this.socialSharing.shareViaFacebook('This is My Shots..', item.url, item.url).then(() => {
        //         alert('facebook share');
        //     });
        // });


        // this.socialSharing.shareViaInstagram('Hello', item.url).then(() => {
        //     alert('facebook share');
        // }).catch((e) => {
        //     alert(e);
        //     // Sharing via email is not possible
        // });
    }


    onSaveIP() {
        this.shootingService.setBaseUrl(this.ip);
        alert('IP was saved!!');
    }
}

