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
        if (this.getBaseUrl()) {
            this.http.get('http://' + this.getBaseUrl() + ':8087/api/GetTargets').subscribe((data: any) => {
                this.targets = JSON.parse(data);
                this.targetsArrived.next(this.targets);
            });
        }
    }

    getBaseUrl() {
        return this.BaseUrl;
    }

    generateFakeShots(numOfShots): Array<{ x: number, y: number }> {
        const arr = new Array<{ x: number, y: number }>();
        for (let i = 0; i < numOfShots; i++) {
            arr.push({x: Math.floor(Math.random() * 16) + 0, y: Math.floor(Math.random() * 16) + 0});
        }
        return arr;
    }
}
