import { ProfileComponent } from './components/profile/profile.component';
import { SecuritySettingsComponent } from './components/security-settings/security-settings.component';
import { NgModule } from '@angular/core';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        component: PersonalInformationComponent,
      },
      {
        path: 'security-settings',
        component: SecuritySettingsComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
