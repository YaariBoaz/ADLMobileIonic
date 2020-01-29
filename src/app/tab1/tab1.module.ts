import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Tab1Page} from './tab1.page';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {ChartsModule} from 'ng2-charts';
import {ActivityHistoryComponent} from '../activity-history/activity-history.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        NgxChartsModule,
        ChartsModule,
        RouterModule.forChild([
            {path: '', component: Tab1Page},
            {path: 'activity-history', component: ActivityHistoryComponent},
        ])
    ],
    declarations: [Tab1Page, ActivityHistoryComponent]
})
export class Tab1PageModule {
}
