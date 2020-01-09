import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Tab2Page} from './tab2.page';
import {SelectTargetModalComponent} from '../select-target-modal/select-target-modal.component';
import {ShootingService} from '../session-modal/shooting.service';
import {SessionModalComponent} from '../session-modal/session-modal/session-modal.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {NgxTimerModule} from 'ngx-timer';
import {Screenshot} from '@ionic-native/screenshot/ngx';
import {ShareModalComponent} from '../share.modal/share.modal.component';
import {IonicStorageModule} from '@ionic/storage';

// @ts-ignore
// @ts-ignore
// @ts-ignore
@NgModule({
    imports: [
        IonicModule,
        MatIconModule,
        NgxTimerModule,
        CommonModule,
        FormsModule,
        IonicStorageModule,
        MatMenuModule,
        RouterModule.forChild([
            {path: '', component: Tab2Page},
            {path: 'select', component: SelectTargetModalComponent},
            {path: 'select2', component: SessionModalComponent}])
    ],
    providers: [Screenshot],
    declarations: [Tab2Page, SelectTargetModalComponent, SessionModalComponent, ShareModalComponent],
    entryComponents: [ShareModalComponent]
})
export class Tab2PageModule {
}
