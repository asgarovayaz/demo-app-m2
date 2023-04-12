import { FormsModule } from "@angular/forms";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PersonalInformationComponent } from "./components/personal-information/personal-information.component";
import { SecuritySettingsComponent } from "./components/security-settings/security-settings.component";
import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from "./components/profile/profile.component";
import { ProfileNavigationComponent } from "./components/profile-navigation/profile-navigation.component";
import { SharedModule } from "@demo-admin/shared/shared.module";

@NgModule({
  declarations: [
    PersonalInformationComponent,
    SecuritySettingsComponent,
    ProfileComponent,
    ProfileNavigationComponent,
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    FormsModule,
    ProfileRoutingModule,
    SharedModule,
  ],
  exports: [],
})
export class ProfileModule {}
