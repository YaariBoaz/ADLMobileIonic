import {ChartDataSets} from 'chart.js';

export class HomeModel {
    charts: Array<any>;

    constructor() {
        this.charts = new Array<any>();
    }
}

export class BaseChart {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

export class HitRatioChart extends BaseChart {
    data: Array<Array<number>>;
    percentage: number;

    constructor(props) {
        super(props);
        this.percentage = 0;
    }

}

export class RateOfFireChart extends BaseChart {
    bestRate: number;
    chartData: ChartDataSets[];
    chartLabels: Array<string>;

    constructor(props) {
        super(props);
        this.bestRate = 0;
        this.chartData = [];
        this.chartLabels = new Array<string>();
    }

}

export class Point {
    x: Date;
    y: number;

    constructor() {
        this.x = new Date();
        this.y = 0;
    }
}

export class BestScores {
    longestShot: number;
    avgSplit: number;
    avgDistance: number;
    lastShooting: Date;

    constructor() {
        this.longestShot = 0;
        this.avgDistance = 0;
        this.avgSplit = 0;
        this.lastShooting = new Date();
    }

}

export class TrainingHistorySummary {
    date: Date;
    day: string;
    numOfDrills: number;

    constructor() {
        this.date = new Date();
        this.day = '';
        this.numOfDrills = 0;
    }
}

export class DashboardModel {
    hitRatioChart: HitRatioChart;
    rateOfFireChart: RateOfFireChart;
    bestScores: BestScores;
    trainingHistorySummary: TrainingHistorySummary[];

    constructor() {
        this.hitRatioChart = new HitRatioChart('Hit Ratio');
        this.rateOfFireChart = new RateOfFireChart('Rate Of Fire');
        this.bestScores = new BestScores();
        this.trainingHistorySummary = new Array<TrainingHistorySummary>();
    }
}
