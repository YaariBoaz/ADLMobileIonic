import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Tab2Page} from './tab2.page';
import {SelectTargetModalComponent} from '../select-target-modal/select-target-modal.component';
import {WebsocketService} from '../session-modal/websocket.service';
import {ShootingService} from '../session-modal/shooting.service';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: Tab2Page}])
    ],
    providers: [WebsocketService, ShootingService],
    declarations: [Tab2Page, SelectTargetModalComponent],
    entryComponents: [SelectTargetModalComponent]
})
export class Tab2PageModule {
}
