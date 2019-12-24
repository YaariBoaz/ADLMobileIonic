import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';
import {TabsPageRoutingModule} from './tabs-routing.module';

import {TabsPage} from './tabs.page';
import {WebsocketService} from '../session-modal/websocket.service';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        ChartsModule,
        FormsModule,
        TabsPageRoutingModule
    ],
    providers: [WebsocketService],
    declarations: [TabsPage]
})
export class TabsPageModule {
}
