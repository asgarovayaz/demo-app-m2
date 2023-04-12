import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoriesManageComponent } from './components/categories-manage/categories-manage.component';
import { CategoriesActionToolsComponent } from './components/categories-action-tools/categories-action-tools.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedAltModule } from '@demo-admin/shared/shared-alt.module';
import { SharedModule } from '@demo-admin/shared/shared.module';
import {
  NgbNavModule,
  NgbAlertModule,
  NgbPaginationModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { errorTailorImports } from '@ngneat/error-tailor';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoriesManageComponent,
    CategoriesActionToolsComponent,
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    NgbNavModule,
    NgbAlertModule,
    NgbPaginationModule,
    NgbDropdownModule,
    EditorModule,
    NgSelectModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    errorTailorImports,
    SharedAltModule,
    SharedModule,
  ],
})
export class CategoriesModule {}
