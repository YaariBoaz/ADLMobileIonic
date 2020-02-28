import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
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
            if (!storageData.homeData) {
                storageData.homeData = {
                    hitRatioChart: {data: [[65, 35]]},
                    rateOfFireChart: {
                        chartData:  [{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }],
                        chartLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
                    },
                    trainingHistory: [
                        {
                            date: '26.7.2002',
                            day: 'Tuesday',
                            numberOfDrills: 6,
                            drillType: 'Zero',
                            hits: 12,
                            totalShots: 16,
                            range: 50,
                            timeLimit: 34,
                            points: 6,
                            recommendation: 'Go Fuck Yourslef'
                        },
                        {
                            date: '28.7.2002',
                            day: 'Tuesday',
                            numberOfDrills: 6,
                            drillType: 'Hostage',
                            hits: 12,
                            totalShots: 16,
                            range: 50,
                            timeLimit: 34,
                            points: 6,
                            recommendation: 'Go Fuck Yourslef'
                        }],
                    bestScores: {
                        longestShot: 1250,
                        avgSplit: 2.5,
                        avgDistance: 3,
                        lastShooting: new Date()
                    }
                };
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
