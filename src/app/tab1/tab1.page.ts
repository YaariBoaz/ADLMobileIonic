import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides, Platform} from '@ionic/angular';
import {ChartDataSets, ChartOptions, ChartType, RadialChartOptions} from 'chart.js';
import {Color, Label, MultiDataSet, PluginServiceGlobalRegistrationAndOptions} from 'ng2-charts';
import {Router} from '@angular/router';
import {UserService} from '../shared/user.service';
import {NetworkService} from '../shared/network.service';
import * as radarChartMetaData from './charts/radarChart';
import * as doghnuChartMetaData from './charts/doghnut';
import * as lineChartMetaData from './charts/line';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
    @ViewChild('slides', {static: true}) slides: IonSlides;

    dashboardData = {
        radarChartData: [
            {data: [65, 90, 90], label: 'Series A', backgroundColor: 'rgba(255, 255, 255)'},
            {data: [100, 100, 100], label: 'Series A', backgroundColor: 'rgba(255, 255, 255)'},
        ],
        lineChartData: [
            {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        ],
        doughnutChartData: [[65, 35]],
        trains: [
            {
                date: '05.07.18',
                day: 'Tuesday',
                numberOfDrills: 6
            },
            {
                date: '05.07.18',
                day: 'Tuesday',
                numberOfDrills: 6
            }]
    };

    radarChartMetaData;
    doghnuChartMetaData;
    lineChartMetaData;


    slideIndex = 0;
    profile;
    options = {
        borderWidth: [0, 0, 0, 0],
        height: 10

    };
    private hasConnection: boolean;

    constructor(private platform: Platform, private networkService: NetworkService, private router: Router, private userService: UserService) {
        this.radarChartMetaData = radarChartMetaData.radarChartMetaData;
        this.doghnuChartMetaData = doghnuChartMetaData.doghnuChartMetaData;
        this.lineChartMetaData = lineChartMetaData.lineChartMetaData;
        this.platform.ready().then((readySource) => {
            this.profile = this.userService.getUser();
            this.networkService.hasConnectionSubject$.subscribe(hasConnection => {
                this.hasConnection = hasConnection;
                if (this.hasConnection) {
                    this.handleOnlineScenario();
                } else {
                    this.handleOfflineScenario();
                }
            });
        });
    }


    ngOnInit(): void {
    }

    slideChanged() {
        this.slides.getActiveIndex().then((index: number) => {
            this.slideIndex = index;
            console.log('currentIndex:', index);
        });
    }

    onNextSlide() {
        this.slides.slideNext(1000);
    }

    onPrevSlide() {
        console.log('Prev');
        this.slides.slidePrev(1000);
    }

    onActivityClicked(train) {
        this.router.navigate(['/home/tabs/tab1/activity-history'], {queryParams: {activity: JSON.stringify(train)}});
    }

    private handleOnlineScenario() {

    }

    private handleOfflineScenario() {

    }
}




