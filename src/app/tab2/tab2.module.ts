import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Tab2Page} from './tab2.page';
import {SelectTargetModalComponent} from '../select-target-modal/select-target-modal.component';
import {WebsocketService} from '../session-modal/websocket.service';
import {ShootingService} from '../session-modal/shooting.service';
import {SessionModalComponent} from '../session-modal/session-modal/session-modal.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

// @ts-ignore
@NgModule({
    imports: [
        IonicModule,
        MatIconModule,
        CommonModule,
        FormsModule,
        MatMenuModule,
        RouterModule.forChild([
            {path: '', component: Tab2Page},
            {path: 'select', component: SelectTargetModalComponent}])
    ],
    providers: [WebsocketService, ShootingService],
    declarations: [Tab2Page, SelectTargetModalComponent, SessionModalComponent],
    entryComponents: [SelectTargetModalComponent, SessionModalComponent]
})
export class Tab2PageModule {
}
