import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Tab3Page} from './tab3.page';
import {IonicStorageModule} from '@ionic/storage';
import {PhotoLibrary} from '@ionic-native/photo-library/ngx';
import {CDVPhotoLibraryPipe} from './ImagePipe';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {Base64} from '@ionic-native/base64/ngx';
import {EmailComposer} from '@ionic-native/email-composer/ngx';
import {SharedModule} from '../shared/services/shared.module';
import {GunlistComponent} from './gunlist/gunlist.component';
import {SightlistComponent} from './sightlist/sightlist.component';
import {MatMenuModule} from '@angular/material/menu';

// @ts-ignore
@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        SharedModule,
        MatMenuModule,
        IonicStorageModule.forRoot(),
        RouterModule.forChild([{path: '', component: Tab3Page}])
    ],
    providers: [PhotoLibrary, EmailComposer, SocialSharing, Base64, CDVPhotoLibraryPipe],
    declarations: [Tab3Page, CDVPhotoLibraryPipe, GunlistComponent, SightlistComponent],
    entryComponents: []
})
export class Tab3PageModule {
}
