import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {NgxChartsModule} from '@swimlane/ngx-charts';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    dashboardImageOn = '../../assets/icons/dashboard.png';
    dashboardImageOff = '../../assets/icons/dashboard-not-selected.png';
    screenHeight;
    screenWdith;

     single = [
        {
            name: 'Germany',
            value: 70
        },
        {
            name: 'home',
            value: 30
        },
    ];

    colorScheme = {
        domain: ['#d98f2b', '#EEEEEE']
    };

    // options
    showLegend = true;
    showLabels = true;



    constructor(private platform: Platform) {
        Object.assign(this, this.single);
        this.platform.ready().then((readySource) => {
            this.screenHeight = this.platform.height();
            this.screenWdith = this.platform.width();
        });
    }


    public chartClicked({event, active}: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
    }

    public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
    }

}
