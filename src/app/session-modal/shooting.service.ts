import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ShootingService {
    selectedDrill;
    numberOfBullersPerDrill: number;
    BaseUrl;

    constructor() {
    }

    setBaseUrl(baseUrl) {
        this.BaseUrl = baseUrl;
    }

    getBaseUrl() {
        return this.BaseUrl;
    }
}
