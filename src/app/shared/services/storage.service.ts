import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    TEMP_TRAINING_HISTORY = [
        {
            date: 'Fri Feb 28 2020 13:02:29 GMT+0200 (Israel Standard Time)',
            day: 'Friday',
            drillType: 'Bullseye',
            hits: 10,
            totalShots: 5,
            range: 150,
            timeLimit: null,
            points: 10,
            recommendation: 'Go Fuck Yourslef',
            shots: [{x: 244.2, y: 259.375}, {x: 244.2, y: 259.375}, {x: 244.2, y: 259.375}, {x: 244.2, y: 208.5}, {
                x: 244.2,
                y: 106.75
            }]
        },
        {
            date: 'Fri Feb 28 2020 13:37:37 GMT+0200 (Israel Standard Time)',
            day: 'Friday',
            drillType: 'Bullseye',
            hits: 10,
            totalShots: 5,
            range: 150,
            timeLimit: null,
            points: 10,
            shots: [{x: 244.2, y: 259.375}, {x: 244.2, y: 208.5}, {x: 244.2, y: 106.75}, {x: 244.2, y: 157.625}, {
                x: 244.2,
                y: 208.5
            }],
            recommendation: {Probabilty: 0, Recommendation: 'Tightening Grip While Pulling Trigger'}
        },
        {
            date: 'Fri Feb 28 2020 13:40:06 GMT+0200 (Israel Standard Time)',
            day: 'Friday',
            drillType: 'Bullseye',
            hits: 10,
            totalShots: 5,
            range: 150,
            timeLimit: null,
            points: 10,
            shots: [{x: 244.2, y: 259.375}, {x: 244.2, y: 208.5}, {x: 244.2, y: 157.625}, {x: 244.2, y: 106.75}, {
                x: 244.2,
                y: 208.5
            }],
            recommendation: {Probabilty: 0, Recommendation: 'Tightening Grip While Pulling Trigger'}
        },
        {
            date: 'Fri Feb 28 2020 13:40:42 GMT+0200 (Israel Standard Time)',
            day: 'Friday',
            drillType: 'Bullseye',
            hits: 10,
            totalShots: 5,
            range: 150,
            timeLimit: null,
            points: 10,
            shots: [{x: 244.2, y: 259.375}, {x: 244.2, y: 208.5}, {x: 244.2, y: 157.625}, {x: 244.2, y: 106.75}, {
                x: 244.2,
                y: 157.625
            }],
            recommendation: {Probabilty: 0, Recommendation: 'Tightening Grip While Pulling Trigger'}
        },
        {
            date: 'Fri Feb 28 2020 13:43:02 GMT+0200 (Israel Standard Time)',
            day: 'Friday',
            drillType: 'Bullseye',
            hits: 10,
            totalShots: 5,
            range: 150,
            timeLimit: null,
            points: 10,
            shots: [{x: 244.2, y: 259.375}, {x: 244.2, y: 208.5}, {x: 244.2, y: 157.625}, {x: 244.2, y: 106.75}, {
                x: 244.2,
                y: 157.625
            }],
            recommendation: {Probabilty: 0.75, Recommendation: 'Good Shooting'}
        }
    ];
    data = {};
    DATA_NAME = 'userInfo';
    historicalTrainingsDate$ = new BehaviorSubject<any>(null);
    DEFAULT_WEAPONS = [
        'AR-15',
        'M4',
        'MP5',
        'DOUBLE BARREL SHOTGUN',
        'P40'
    ];
    DEFAULT_SIGHTS = [
        'Trij',
        'SLT',
        'XXX',
        'DP',
        'P40'
    ];

    constructor(private storage: Storage) {
        this.storage.get(this.DATA_NAME).then((storageData => {
            if (!storageData) {
                storageData = {};
            }

            if (storageData.homeData) {
                storageData.homeData = {
                    hitRatioChart: {data: [[65, 35]]},
                    rateOfFireChart: {
                        chartData: [{data: [65, 59, 80, 81, 56, 55, 40]}],
                        chartLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
                    },
                    trainingHistory: this.TEMP_TRAINING_HISTORY,
                    bestScores: {
                        longestShot: 1250,
                        avgSplit: 2.5,
                        avgDistance: 3,
                        lastShooting: new Date()
                    }
                };
                this.storage.set('homeData', storageData.homeData);
            }
            this.data = storageData;
        }));
    }


    getItem(key?: string): any {
        return this.data[key];
    }

    setItem(key: string, value: any) {
        this.data[key] = value;
        this.storage.set(this.DATA_NAME, this.data);
    }

    passhistoricalTrainingsDate(date) {
        this.historicalTrainingsDate$.next(date);
    }
}
