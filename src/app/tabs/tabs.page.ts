import { Component } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { rollIn } from 'ngx-animate';



@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss'],
    animations: [
        trigger('rollIn', [transition('* => *', useAnimation(rollIn, {
            // Set the duration to 5seconds and delay to 2seconds
            params: { timing: 1 }
        }))])
    ],
})
export class TabsPage {
    isDashbord = true;
    isWeapon = false;
    isSettings = false;

    fakeProgrssBarValue = 13;
    splash = true;
    secondPage = TabsPage;
    tabBarElement: any;
    constructor() {
        this.tabBarElement = document.querySelector('.tabbar');
        this.fakeProgrssBar()

    }

    ionViewDidLoad() {
        this.tabBarElement.style.display = 'none';
        setTimeout(() => {
            this.splash = false;
            this.tabBarElement.style.display = 'flex';
        }, 4000);
    }
    fakeProgrssBar() {
        this.fakeProgrssBarValue = 1
        var id = setInterval(() => {
            if (this.fakeProgrssBarValue >= 100) {
                clearInterval(id);
                this.fakeProgrssBarValue = 0;
                this.splash = false;
            } else {
                this.fakeProgrssBarValue++;
            }
        }, 100);


    }



    onTabOneClick() {
        this.isDashbord = true;
        this.isSettings = false;
        this.isWeapon = false;
    }

    onTabTwoClick() {
        this.isDashbord = false;
        this.isSettings = false;
        this.isWeapon = true;
    }

    onTabThreeClick() {
        this.isDashbord = false;
        this.isSettings = true;
        this.isWeapon = false;
    }
}
