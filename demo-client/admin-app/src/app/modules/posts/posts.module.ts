import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './components/posts/posts.component';
import { PostsManageComponent } from './components/posts-manage/posts-manage.component';
import {
  NgbAlertModule,
  NgbDropdownModule,
  NgbNavModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { errorTailorImports } from '@ngneat/error-tailor';
import { SharedAltModule } from '@demo-admin/shared/shared-alt.module';
import { SharedModule } from '@demo-admin/shared/shared.module';
import { PostsActionToolsComponent } from './components/posts-action-tools/posts-action-tools.component';

@NgModule({
  declarations: [
    PostsComponent,
    PostsManageComponent,
    PostsActionToolsComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
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
export class PostsModule {}
