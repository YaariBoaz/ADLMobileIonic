import {Component, OnInit} from '@angular/core';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';
import {Router} from '@angular/router';
import {trigger, transition, useAnimation} from '@angular/animations';
import {zoomIn, bounceInRight, bounceInLeft, bounceInUp, bounceInDown} from 'ngx-animate';
import {HttpClient} from '@angular/common/http';
import {ModalController} from '@ionic/angular';
import {NetworkService} from '../../services/network.service';
import {UserService} from '../../services/user.service';
import {StorageService} from '../../services/storage.service';
import {AlertController} from '@ionic/angular';


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
    socket;

    constructor(
        private fb: Facebook,
        private http: HttpClient,
        private router: Router,
        private storageService: StorageService,
        private  modalService: ModalController,
        public alertController: AlertController,
        private  network: NetworkService,
        private userService: UserService) {


    }

    ionViewDidLoad() {

    }

    ngOnInit() {
        setTimeout(() => {
            if (this.storageService.getItem('isLogedIn')) {
                this.router.navigateByUrl('/home/tabs/tab1');
            } else {
                this.splash = false;
            }
        }, 5000);
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
                            profileData.picture = 'https://graph.facebook.com/' + profileData.id + '/picture?width=1024&height=1024';
                            this.storageService.setItem('profileData', profileData);
                            this.storageService.setItem('isLogedIn', true);
                            this.router.navigateByUrl('/home/tabs/tab1');
                        }, (err) => {
                            this.showAlert();
                        });
                }
                console.log('Logged into Facebook!', response);
            })
            .catch(e => {
                console.log('Error logging into Facebook', e);
            });
        this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
    }

    async showAlert() {
        const alert = await this.alertController.create({
            header: 'Alert',
            subHeader: 'Subtitle',
            message: 'This is an alert message.',
            buttons: ['OK']
        });
        alert.present();
    }

    goToSignUp() {
        this.isSignIn = false;
    }

    onLogin() {
        // if (this.password && this.password > 3 && this.userName.indexOf('adl') > -1) {
        this.router.navigateByUrl('/home/tabs/tab1');
        // }
    }

    backToSignin() {
        this.isSignIn = true;
    }
}
