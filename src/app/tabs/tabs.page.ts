import {Component} from '@angular/core';


@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss'],

})
export class TabsPage {
    isDashbord = true;
    isWeapon = false;
    isSettings = false;

    fakeProgrssBarValue = 13;
    splash = true;
    secondPage = TabsPage;
    tabBarElement: any;
    isLoading = false;

    constructor() {
        this.tabBarElement = document.querySelector('.tabbar');
    }

    ionViewDidLoad() {
        this.tabBarElement.style.display = 'none';
        setTimeout(() => {
            this.splash = false;
            this.tabBarElement.style.display = 'flex';
        }, 4000);
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
