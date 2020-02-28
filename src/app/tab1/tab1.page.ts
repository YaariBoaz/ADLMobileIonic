import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides, Platform} from '@ionic/angular';
import {Router} from '@angular/router';
import {UserService} from '../shared/services/user.service';
import {NetworkService} from '../shared/services/network.service';
import {LineChartMetaData, lineChartMetaData} from './charts/line';
import {StorageService} from '../shared/services/storage.service';
import {DashboardModel} from '../shared/models/dashboard-model';
import {DoghnuChartMetaData, doghnuChartMetaData} from './charts/doghnut';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
    @ViewChild('slides', {static: false}) slides: IonSlides;


    radarChartMetaData;
    doghnuChartMetaData: DoghnuChartMetaData;
    lineChartMetaData: LineChartMetaData;


    slideIndex = 0;
    profile;
    options = {
        borderWidth: [0, 0, 0, 0],
        height: 10

    };
    private hasConnection: boolean;
    private data: DashboardModel;

    constructor(private platform: Platform,
                private networkService: NetworkService,
                private router: Router,
                private userService: UserService,
                private storageService: StorageService) {
        this.doghnuChartMetaData = doghnuChartMetaData;
        this.lineChartMetaData = lineChartMetaData;
        this.platform.ready().then((readySource) => {
            this.profile = this.userService.getUser();
            this.networkService.hasConnectionSubject$.subscribe(hasConnection => {
                this.hasConnection = hasConnection;
                if (this.hasConnection) {
                    this.handleOfflineScenario();
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
        this.slides.slidePrev(1000);
    }

    onActivityClicked(train) {
        this.storageService.passhistoricalTrainingsDate(train.date);
        this.router.navigate(['/home/tabs/tab1/activity-history'], {queryParams: {activity: JSON.stringify(train)}});
    }

    private handleOnlineScenario() {

    }

    private handleOfflineScenario() {
        this.data = this.storageService.getItem('homeData');
    }
}





