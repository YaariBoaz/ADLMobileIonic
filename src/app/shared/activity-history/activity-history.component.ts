// @ts-ignore
import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NetworkService} from '../services/network.service';
import {StorageService} from '../services/storage.service';
import {Router} from '@angular/router';

// @ts-ignore
@Component({
    selector: 'app-activity-history',
    templateUrl: './activity-history.component.html',
    styleUrls: ['./activity-history.component.scss'],
})
export class ActivityHistoryComponent implements OnInit, OnChanges {
    train = {
        date: '05.07.18',
        day: 'Tuesday',
        numberOfDrills: 6
    };
    drills: TrainingHistory[];
    hasConnection;

    constructor(private  router: Router, private  networkService: NetworkService, private stoargeService: StorageService) {
        this.networkService.hasConnectionSubject$.subscribe(hasConnection => {
            this.hasConnection = hasConnection;
            if (this.hasConnection) {
                this.handleOfflineScenario();
            } else {
                this.handleOfflineScenario();
            }
        });
    }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges): void {
     }

    toggleAccordian(event, index) {
        const element = event.target;
        element.classList.toggle('active');
        if ((this.drills[index] as any).isActive) {
            (this.drills[index] as any).isActive = false;
        } else {
            (this.drills[index] as any).isActive = true;
        }
        const panel = element.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }
    }

    onBackPressed() {
        this.router.navigateByUrl('/home/tabs/tab1');
    }

    handleOfflineScenario() {
        this.stoargeService.historicalTrainingsDate$.subscribe((date) => {
            if (date) {
                this.drills = [];
                const tempDrills = this.stoargeService.getItem('homeData').trainingHistory;
                const [day, month, year] = date.split('.');
                const dateObject = new Date(year, month - 1, day);
                tempDrills.forEach((drill) => {
                    const [day1, month1, year1] = date.split('.');
                    const dateObject1 = new Date(year1, month1 - 1, day1);
                    if (dateObject1.getMonth() === dateObject.getMonth()) {
                        this.drills.push(drill);
                    }
                });
            }

        });

    }

    handleOnlineScenario() {

    }
}

export interface TrainingHistory {
    date: string;
    day: string;
    numberOfDrills: number;
    hits: number;
    totalShots: number;
    range: number;
    timeLimit: number;
    drillType: string;
    points: number;
    recommendation: string;
}
