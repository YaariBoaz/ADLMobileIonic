import {Component} from '@angular/core';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage {
    isDashboard = true;
    isWeapon = false;
    isSettings = false;

    constructor() {
    }

    onTabOneClick() {
        this.isDashboard = true;
        this.isSettings = false;
        this.isWeapon = false;
    }

    onTabTwoClick() {
        this.isDashboard = false;
        this.isSettings = false;
        this.isWeapon = true;
    }

    onTabThreeClick() {
        this.isDashboard = false;
        this.isSettings = true;
        this.isWeapon = false;
    }
}
