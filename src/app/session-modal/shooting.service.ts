import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShootingService {
    selectedDrill;
    numberOfBullersPerDrill: number;
    BaseUrl;
    targets;
    targetsArrived = new BehaviorSubject(null);
    chosenTarget: any;

    constructor(private http: HttpClient) {
    }

    setBaseUrl(baseUrl) {
        this.BaseUrl = baseUrl;
    }

    setTargetsI() {
        this.http.get('http://' + this.getBaseUrl() + ':8087/api/GetTargets').subscribe((data: any) => {
            this.targets = JSON.parse(data);
            this.targetsArrived.next(this.targets);
        });
    }

    getBaseUrl() {
        return this.BaseUrl;
    }
}
