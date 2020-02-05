import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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
    showTargetFlag = false;
    drills = [
        {
            date: '05.07.18',
            day: 'Tuesday',
            numberOfDrills: 6,
            hits: 10,
            totalShots: 12,
            range: 100,
            timeLimit: null,
            drillType: 'Zero',
            points: 14,
            reccomendation: 'Eat shit for breakfest'
        },
        {
            date: '06.07.18',
            day: 'Wednsday',
            numberOfDrills: 9,
            drillType: 'Hostage',
            hits: 5,
            totalShots: 9,
            range: 30,
            timeLimit: 30,
            points: 12,
            reccomendation: 'Take a shower'
        }
    ];

    constructor(public activatedRoute: ActivatedRoute, private  router: Router) {
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((data: any) => {
            this.train = JSON.parse(data);
        });

    }

    ngOnChanges(changes: SimpleChanges): void {
    debugger;
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
}
