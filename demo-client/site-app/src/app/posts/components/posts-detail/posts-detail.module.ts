import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsDetailRoutingModule } from './posts-detail-routing.module';
import { PostsDetailComponent } from './posts-detail.component';
import { SharedModule } from 'site-app/src/app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [PostsDetailComponent],
  imports: [
    CommonModule,
    PostsDetailRoutingModule,
    SharedModule,
    TranslocoModule,
  ],
})
export class PostsDetailModule {}
