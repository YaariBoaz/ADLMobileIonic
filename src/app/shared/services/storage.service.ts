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

    constructor(private storage: Storage) {
        this.storage.get(this.DATA_NAME).then((storageData => {
            if (!storageData) {
                storageData = {};
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
