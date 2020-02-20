import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivityHistoryComponent} from '../activity-history/activity-history.component';
import {SinginModule} from '../authentication/singin/singin.module';
import {SelectTargetModalComponent} from '../select-target-modal/select-target-modal.component';
import {SessionModalComponent} from '../session-modal/session-modal/session-modal.component';
import {IonicModule} from '@ionic/angular';
import {MatMenuModule} from '@angular/material';
import {NgxTimerModule} from 'ngx-timer';
import {FormsModule} from '@angular/forms';
import {Network} from '@ionic-native/network/ngx';
import {ShootingService} from './shooting.service';
import {NetworkService} from './network.service';
import {ApiService} from './api.service';
import {UserService} from './user.service';

@NgModule({
    declarations: [ActivityHistoryComponent, SelectTargetModalComponent, SessionModalComponent],
    entryComponents: [ActivityHistoryComponent, SelectTargetModalComponent, SessionModalComponent],
    exports: [ActivityHistoryComponent, SelectTargetModalComponent, SessionModalComponent],
    imports: [
        CommonModule,
        SinginModule,
        MatMenuModule,
        NgxTimerModule,
        IonicModule.forRoot(),
        FormsModule
    ],
    providers: [ShootingService, NetworkService, ApiService, UserService, Network]
})
export class SharedModule {
}
