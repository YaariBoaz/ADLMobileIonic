import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SinginComponent } from "./signin/singin/singin.component";
import { AuthRouting } from './auth.routing';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [SinginComponent],
  imports: [IonicModule, AuthRouting]
})
export class AuthModule { }
