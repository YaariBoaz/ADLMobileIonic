import {Component} from '@angular/core';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage {
    isDashbord = true;
    isWeapon = false;
    isSettings = false;

    constructor() {
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
