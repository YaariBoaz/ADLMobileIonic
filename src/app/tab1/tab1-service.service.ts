import {Injectable} from '@angular/core';
import {ChartDataSets, ChartType, RadialChartOptions} from 'chart.js';
import {Label} from 'ng2-charts';
import {Storage} from '@ionic/storage';
import {Observable} from 'rxjs';
import {ApiService} from '../shared/api.service';

@Injectable({
    providedIn: 'root'
})
export class Tab1ServiceService {
    radarChartData: ChartDataSets[] = [
        {data: [65, 90, 90, 81, 100], label: 'Series A', backgroundColor: 'rgba(255, 255, 255)'},
        {data: [100, 100, 100, 100, 100], label: 'Series A', backgroundColor: 'rgba(255, 255, 255)'},
    ];


    constructor(private storage: Storage, private apiService: ApiService) {
    }

    async getDashboardData(hasConnection) {
        if (!hasConnection) {
            this.storage.get('dashboardData').then((data) => {
                return data;
            });
        } else {
            this.apiService.getDashboardData().subscribe(data => {
                this.storage.set('dashboardData', data);
                return data;
            });
        }
    }
}
