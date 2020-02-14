import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Storage} from '@ionic/storage';
import {StorageService} from '../../shared/storage.service';

@Component({
    selector: 'app-gunlist',
    templateUrl: './gunlist.component.html',
    styleUrls: ['./gunlist.component.scss'],
})
export class GunlistComponent implements OnInit {
    @Output()
    close = new EventEmitter();
    DEFUALT_GUNS = {
        AR: [{model: 'M5', isSelected: false}, {model: 'M16', isSelected: false}],
        Colt: [{model: 'COLT 1', isSelected: false}, {model: 'COLT 2', isSelected: false}],
        Remington: [{model: 'Remington 1', isSelected: false}, {model: 'Remington 2', isSelected: false}],
    };
    public goalList: any[];
    public loadedGoalList: {};

    gunTypes;
    models = null;
    myGuns = null;
    private selectedGunType = '';

    constructor(private storage: Storage, private storageService: StorageService) {
    }

    ngOnInit() {
        this.myGuns = this.storageService.getItem('gunList');
        this.loadedGoalList = this.DEFUALT_GUNS;
    }

    filterList($event) {
        const searchTerm = $event.srcElement.value;t
        if (!searchTerm) {
            return;
        }

        this.goalList = this.goalList.filter(currentGoal => {
            if (currentGoal && searchTerm) {
                if (currentGoal.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
                    return true;
                }
                return false;
            }
        });
    }


    onBackPressed() {

    }

    onShowModel(item) {
        this.selectedGunType = item.key;
        this.models = this.gunTypes[item.key];
    }

    onModelClicked(item: any) {
        if (!this.myGuns) {
            this.myGuns = [];
        }
        this.myGuns.push(this.selectedGunType + ', ' + item.model);
        this.gunTypes[this.selectedGunType].forEach(model => {
            if (model.model === item.model) {
                model.isSelected = !model.isSelected;
            }
        });
        this.models = null;
    }

    onSaveWeapons() {
        this.storageService.setItem('gunList', this.myGuns);
        this.close.emit();
    }
}
