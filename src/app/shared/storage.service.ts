import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    data = {};
    DATA_NAME = 'userInfo';

    constructor(private storage: Storage) {
        this.storage.get(this.DATA_NAME).then((storageData => {
            if (!storageData) {
                storageData = {};
            }
            this.data = storageData;
        }));
    }

    getItem(key?: string) {

        return this.data[key];
    }

    setItem(key: string, value: any) {
        this.data[key] = value;
        this.storage.set(this.DATA_NAME, this.data);
    }
}
