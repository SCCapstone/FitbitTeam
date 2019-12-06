import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CmainComponent } from './cmain/cmain.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { CSettingsComponent } from './c-settings/c-settings.component';
import { TimelineComponent } from './timeline/timeline.component';
import { RecoveryComponent } from './recovery/recovery.component';
import * as firebase from 'firebase';
import { ResetComponent } from './reset/reset.component';
import { ASettingsComponent } from './a-settings/a-settings.component';

  var firebaseConfig = {
    apiKey: "AIzaSyDdtiMAA8rQKsQhgsZXxORkWbO1wbr2miI",
    authDomain: "fitbitteam-988d7.firebaseapp.com",
    databaseURL: "https://fitbitteam-988d7.firebaseio.com",
    projectId: "fitbitteam-988d7",
    storageBucket: "fitbitteam-988d7.appspot.com",
    messagingSenderId: "801206610361",
    appId: "1:801206610361:web:37b2a71630cf2bb87eee68",
    measurementId: "G-4NX86BPYQT"
  };
  firebase.initializeApp(firebaseConfig);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CmainComponent,
    AdminMainComponent,
    CSettingsComponent,
    TimelineComponent,
    RecoveryComponent,
    ResetComponent,
    ASettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
