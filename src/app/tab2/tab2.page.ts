import {Component} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {SessionModalComponent} from '../session-modal/session-modal/session-modal.component';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    sliderTwo =
        {
            isBeginningSlide: true,
            isEndSlide: false,
            slidesItems: [
                {
                    id: 6,
                    image: '../../assets/icons/Zero.png',
                },
                {
                    id: 7,
                    image: '../../assets/icons/Hostage.png',
                },
                {
                    id: 8,
                    image: '../../assets/icons/Zero.png',
                },
                {
                    id: 9,
                    image: '../../assets/icons/bullseye_red.png',
                },
            ]
        };


    slideOptsTwo = {
        initialSlide: 1,
        slidesPerView: 2,
        loop: true,
        centeredSlides: true
    };

    constructor(public modalController: ModalController) {

    }

    SlideDidChange(object, slideView) {
        this.checkIfNavDisabled(object, slideView);
    }


    checkIfNavDisabled(object, slideView) {
        this.checkisBeginning(object, slideView);
        this.checkisEnd(object, slideView);
    }

    checkisBeginning(object, slideView) {
        slideView.isBeginning().then((istrue) => {
            object.isBeginningSlide = istrue;
        });
    }

    checkisEnd(object, slideView) {
        slideView.isEnd().then((istrue) => {
            object.isEndSlide = istrue;
        });
    }


    async startSesstion() {
        const modal = await this.modalController.create({
            component: SessionModalComponent
        });
        return await modal.present();
    }


}
