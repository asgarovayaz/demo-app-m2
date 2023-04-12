import { NgModule } from "@angular/core";
import { TableDateViewComponent } from "./components/table-date-view/table-date-view.component";
import { TableStatusComponent } from "./components/table-col-status/table-col-status.component";
import { CommonModule } from "@angular/common";
import { DialogComponent } from "./components/approve-detail/approve-detail.component";
import { TableGenderComponent } from "./components/table-col-gender/table-col-gender.component";
import { TableDateDeadlineViewComponent } from "./components/table-date-deadline-view/table-date-deadline-view.component";
import { TableSettingsComponent } from "./components/table-settings/table-settings.component";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { StatusChangeModalComponent } from "./components/status-change-modal/status-change-modal.component";
@NgModule({
  declarations: [
    TableDateViewComponent,
    TableDateDeadlineViewComponent,
    TableStatusComponent,
    TableGenderComponent,
    TableSettingsComponent,
    StatusChangeModalComponent,
    DialogComponent,
  ],
  imports: [CommonModule, NgbDropdownModule],
  exports: [
    TableDateViewComponent,
    TableDateDeadlineViewComponent,
    TableStatusComponent,
    TableGenderComponent,
    TableSettingsComponent,
    DialogComponent,
    StatusChangeModalComponent,
  ],
})
export class SharedAltModule {}
