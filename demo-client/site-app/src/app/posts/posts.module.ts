import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './components/posts/posts.component';
import { SharedModule } from 'site-app/src/app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [PostsComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule,
    NgbPaginationModule,
    TranslocoModule,
  ],
})
export class PostsModule {}
