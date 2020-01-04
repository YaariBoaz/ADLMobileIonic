import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ShootingService {
    selectedDrill;
    numberOfBullersPerDrill: number;

    constructor() {
    }
}
