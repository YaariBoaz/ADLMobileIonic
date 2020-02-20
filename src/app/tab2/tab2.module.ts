import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Tab2Page} from './tab2.page';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {NgxTimerModule} from 'ngx-timer';
import {Screenshot} from '@ionic-native/screenshot/ngx';
import {IonicStorageModule} from '@ionic/storage';
import {SelectTargetModalComponent} from '../shared/select-target-modal/select-target-modal.component';
import {SessionModalComponent} from '../shared/session-modal/session-modal/session-modal.component';
import {SharedModule} from '../shared/services/shared.module';

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
        SharedModule,
        IonicStorageModule,
        MatMenuModule,
        RouterModule.forChild([
            {path: '', component: Tab2Page},
            {path: 'select', component: SelectTargetModalComponent},
            {path: 'select2', component: SessionModalComponent}])
    ],
    providers: [Screenshot],
    declarations: [Tab2Page],
    entryComponents: [],
})
export class Tab2PageModule {
}
