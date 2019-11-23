import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CmainComponent } from './cmain/cmain.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { CSettingsComponent } from './c-settings/c-settings.component';
import { TimelineComponent } from './timeline/timeline.component';
import { RecoveryComponent } from './recovery/recovery.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CmainComponent,
    AdminMainComponent,
    CSettingsComponent,
    TimelineComponent,
    RecoveryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
