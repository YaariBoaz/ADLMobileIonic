import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides, Platform} from '@ionic/angular';
import {ChartDataSets, ChartOptions, ChartType, RadialChartOptions} from 'chart.js';
import {Color, Label, MultiDataSet, PluginServiceGlobalRegistrationAndOptions} from 'ng2-charts';
import {Storage} from '@ionic/storage';
import {NetworkService} from '../network.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

    slideIndex = 0;

    @ViewChild('slides', {static: true}) slides: IonSlides;

    public radarChartOptions: RadialChartOptions = {
        responsive: true,
        scale: {
            gridLines: {
                color: 'rgba(255, 255, 255)'
            }
        }
    };
    public radarChartLabels: Label[] = ['Precision', 'SPEED', 'HIT RELIABILITY', 'PARTICIPATION', 'HANDLING'];

    public radarChartData: ChartDataSets[] = [
        {data: [65, 90, 90, 81, 100], label: 'Series A', backgroundColor: 'rgba(255, 255, 255)'},
        {data: [100, 100, 100, 100, 100], label: 'Series A', backgroundColor: 'rgba(255, 255, 255)'},
    ];
    public radarChartType: ChartType = 'radar';
    private radarColorsPrecision = [
        {backgroundColor: 'rgba(195, 147, 82)'},
        {backgroundColor: 'rgba(255, 255, 255)'}
    ];
    public doughnutChartTypePrecision: ChartType = 'doughnut';


    lineChartData: ChartDataSets[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    ];
    lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    lineChartOptions: (ChartOptions & { annotation: any }) = {
        annotation: undefined,
        responsive: true
    };
    lineChartColors: Color[] = [
        {
            borderColor: 'rgba(165,207,238)',
            backgroundColor: 'transparent'
        },
    ];
    lineChartType = 'line';
    lineChartPlugins = [];


    public doughnutChartPlugins: PluginServiceGlobalRegistrationAndOptions[] = [{
        beforeDraw(chart: any) {
            const ctx = chart.ctx;
            const txt = 'Center Text';

            const sidePadding = 60;
            const sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2);

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
            const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);

            const stringWidth = ctx.measureText(txt).width;
            const elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

            // Find out how much the font can grow in width.
            const widthRatio = elementWidth / stringWidth;
            const newFontSize = 25;
            const elementHeight = (chart.innerRadius * 2);

            // Pick a new font size so it will not be larger than the height of label.
            const fontSizeToUse = Math.min(newFontSize, elementHeight);

            ctx.font = fontSizeToUse + 'px Open Sans';
            ctx.fillStyle = '#c39352';

            // Draw text in center
            ctx.fillText('67%', centerX, centerY);
        }
    }];


    private donutColors = [
        {
            backgroundColor: [
                'rgba(217, 143, 43)',
                'rgba(238, 238, 238)',
            ],
            borderWidth: [0, 0, 0, 0],
        }
    ];


    public doughnutChartLabels: Label[] = ['Hits', 'Missed'];
    public doughnutChartData: MultiDataSet = [
        [65, 35],

    ];
    public doughnutChartType: ChartType = 'doughnut';


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

    profile;
    options = {
        borderWidth: [0, 0, 0, 0],
        height: 10

    };
    trains = [{
        date: '05.07.18',
        day: 'Tuesday',
        numberOfDrills: 6
    }, {
        date: '05.07.18',
        day: 'Tuesday',
        numberOfDrills: 6
    }];


    constructor(private platform: Platform, private storage: Storage, private networkService: NetworkService, private router: Router) {
        Object.assign(this, this.single);
        this.platform.ready().then((readySource) => {
            this.screenHeight = this.platform.height();
            this.screenWdith = this.platform.width();
            this.storage.get('user').then((val) => {
                this.profile = val;
            });
        });
    }


    public chartClicked({event, active}: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
    }

    public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
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
        this.router.navigate(['/home/tabs/tab1/activity-history'], {queryParams: {activity: JSON.stringify(train)}});
    }
}




