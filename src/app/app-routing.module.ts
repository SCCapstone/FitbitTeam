import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CmainComponent } from './cmain/cmain.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { CSettingsComponent } from './c-settings/c-settings.component';
import { TimelineComponent } from './timeline/timeline.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { ResetComponent } from './reset/reset.component';
import { ASettingsComponent} from './a-settings/a-settings.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'cmain', component: CmainComponent },
  { path: 'admin', component: AdminMainComponent },
  { path: 'settings', component: CSettingsComponent },
  { path: 'timeline', component: TimelineComponent },
  { path: 'recovery', component: RecoveryComponent },
  { path: 'reset', component: ResetComponent },
  { path: 'asettings', component: ASettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
