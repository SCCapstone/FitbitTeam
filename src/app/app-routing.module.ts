import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CmainComponent } from './cmain/cmain.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { CSettingsComponent } from './c-settings/c-settings.component';
import { TimelineComponent } from './timeline/timeline.component';
import { RecoveryComponent } from './recovery/recovery.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'cmain', component: CmainComponent },
  { path: 'admin', component: AdminMainComponent },
  { path: 'settings', component: CSettingsComponent },
  { path: 'timeline', component: TimelineComponent },
  { path: 'recovery', component: RecoveryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
