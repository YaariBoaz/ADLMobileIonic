import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label, MultiDataSet, PluginServiceGlobalRegistrationAndOptions} from 'ng2-charts';
import {Storage} from '@ionic/storage';
import {NetworkService} from '../network.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


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

            ctx.font = fontSizeToUse + 'px Arial';
            ctx.fillStyle = 'white';

            // Draw text in center
            ctx.fillText('67%', centerX, centerY);
        }
    }];


    private donutColors = [
        {
            backgroundColor: [
                'rgba(217, 143, 43)',
                'rgba(238, 238, 238)',
            ]
        }
    ];


    public doughnutChartLabels: Label[] = ['Hits', 'Missed'];
    public doughnutChartData: MultiDataSet = [
        [65, 35],

    ];
    public doughnutChartType: ChartType = 'doughnut';


    dashboardImageOn = '../../assets/icons/dashboard.png';
    dashboardImageOff = '../../assets/icons/dashboard-not-selected.png';
    screenHeight;
    screenWdith;


    singleLine = [
        {
            name: 'Karthikeyan',
            series: [
                {
                    name: '2016',
                    value: '15000'
                },
                {
                    name: '2017',
                    value: '20000'
                },
                {
                    name: '2018',
                    value: '25000'
                },
                {
                    name: '2019',
                    value: '30000'
                }
            ],
        },
    ];


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

    colorSchemeLine = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    colorScheme = {
        domain: ['#d98f2b', '#EEEEEE']
    };


    xAxisLabel = 'Country';
    yAxisLabel = 'Population';


    // options
    showLegend = true;
    showLabels = true;
    profile;
    options = {

        height: 10
    };


    constructor(private platform: Platform, private storage: Storage, private networkService: NetworkService) {
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

}
