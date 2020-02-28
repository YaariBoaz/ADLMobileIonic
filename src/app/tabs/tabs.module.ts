import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';
import {TabsPageRoutingModule} from './tabs-routing.module';

import {TabsPage} from './tabs.page';
import {MatMenuModule} from '@angular/material';
import {NgxTimerModule} from 'ngx-timer';
import {Screenshot} from '@ionic-native/screenshot/ngx';
import {TabsService} from './tabs.service';


@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        ChartsModule,
        FormsModule,
        TabsPageRoutingModule,
        MatMenuModule,
        NgxTimerModule,
    ],
    providers: [Screenshot, TabsService],
    declarations: [TabsPage],
    exports: []
})
export class TabsPageModule {
}
