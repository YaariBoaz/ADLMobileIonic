import {Component, OnInit} from '@angular/core';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {trigger, transition, useAnimation} from '@angular/animations';
import {zoomIn, bounceInRight, bounceInLeft, bounceInUp, bounceInDown} from 'ngx-animate';
import {HttpClient} from '@angular/common/http';
import {ModalController} from '@ionic/angular';
import {ShareModalComponent} from '../../share.modal/share.modal.component';
import {NetworkService} from '../../network.service';
import {UserService} from '../../user.service';

@Component({
    selector: 'app-singin',
    templateUrl: './singin.component.html',
    styleUrls: ['./singin.component.scss'],
    animations: [
        trigger('zoomIn', [transition('* => *', useAnimation(zoomIn, {
            // Set the duration to 5seconds and delay to 2seconds
            params: {timing: 5}
        }))]),
        trigger('bounceInRight', [transition('* => *', useAnimation(bounceInRight, {
            // Set the duration to 5seconds and delay to 2seconds
            params: {deley: 2, timing: 2}
        }))]),
        trigger('bounceInLeft', [transition('* => *', useAnimation(bounceInLeft, {
            // Set the duration to 5seconds and delay to 2seconds
            params: {deley: 3, timing: 4}
        }))]),
        trigger('bounceInUp', [transition('* => *', useAnimation(bounceInUp, {
            // Set the duration to 5seconds and delay to 2seconds
            params: {deley: 4, timing: 6}
        }))]),
        trigger('bounceInDown', [transition('* => *', useAnimation(bounceInDown, {
            // Set the duration to 5seconds and delay to 2seconds
            params: {deley: 5, timing: 8}
        }))])
    ],
})
export class SinginComponent implements OnInit {
    splash = true;
    isSignIn = true;

    userName;
    password;

    constructor(
        private fb: Facebook,
        private http: HttpClient,
        private storage: Storage,
        private router: Router,
        private  modalService: ModalController,
        private  network: NetworkService,
        private userService: UserService) {
        this.network.hasConnectionSubject$.subscribe((connectionStatus) => {
            this.storage.get('user').then(user => {
                if (user) {
                    this.userService.setUser(user);
                    setTimeout(() => {
                        this.router.navigateByUrl('/home/tabs/tab1');
                    }, 1000);
                } else {
                    setTimeout(() => {
                        this.splash = false;
                    }, 1000);
                }
            });
        });
    }


    ionViewDidLoad() {
    }

    ngOnInit() {
    }

    onFBClick() {
        this.fb.login(['public_profile', 'email'])
            .then((response: FacebookLoginResponse) => {
                if (response.authResponse.userID !== '') {
                    this.fb.api(
                        // tslint:disable-next-line:max-line-length
                        'me?fields=id,name,email,first_name,last_name,picture.width(600).height(600).as(picture_small),picture.width(360).height(360).as(picture_large)',
                        [])
                        .then((profileData) => {
                            console.log(JSON.stringify(profileData));
                            // tslint:disable-next-line:max-line-length
                            const homo = profileData.picture = 'https://graph.facebook.com/' + profileData.id + '/picture?width=1024&height=1024';
                            this.storage.set('user', profileData);
                            this.router.navigateByUrl('/home/tabs/tab1');

                        }, (err) => {
                            console.log(JSON.stringify(err));
                        });
                }
                console.log('Logged into Facebook!', response);
            })
            .catch(e => {
                console.log('Error logging into Facebook', e);
            });
        this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
    }

    goToSignUp() {
        this.isSignIn = false;
    }

    onLogin() {
        // if (this.password && this.password > 3 && this.userName.indexOf('adl') > -1) {
        this.router.navigateByUrl('/home/tabs/tab1');
        // }
    }
}
