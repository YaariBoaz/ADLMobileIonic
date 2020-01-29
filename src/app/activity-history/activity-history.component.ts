import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-activity-history',
    templateUrl: './activity-history.component.html',
    styleUrls: ['./activity-history.component.scss'],
})
export class ActivityHistoryComponent implements OnInit {
    train = {
        date: '05.07.18',
        day: 'Tuesday',
        numberOfDrills: 6
    };
    showTargetFlag = false;

    constructor(public activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((data: any) => {
            this.train = JSON.parse(data);
        });

    }


}
