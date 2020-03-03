import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Tab1Page} from './tab1.page';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {ChartsModule} from 'ng2-charts';
import {Screenshot} from '@ionic-native/screenshot/ngx';
import {ActivityHistoryPageComponent} from './activity-history-page/activity-history-page.component';
import {SharedModule} from '../shared/services/shared.module';
import {MatIconModule} from '@angular/material/icon';
import {MatAccordion, MatExpansionModule, MatMenuModule} from '@angular/material';


@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        SharedModule,
        NgxChartsModule,
        MatIconModule,
        MatMenuModule,
        ChartsModule,
        RouterModule.forChild([
            {path: '', component: Tab1Page},
            {path: 'activity-history', component: ActivityHistoryPageComponent},
        ])
    ],
    providers: [Screenshot],
    declarations: [Tab1Page, ActivityHistoryPageComponent],

})
export class Tab1PageModule {
}
