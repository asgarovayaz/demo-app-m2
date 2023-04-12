import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsDetailComponent } from './posts-detail.component';

const routes: Routes = [{ path: '', component: PostsDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsDetailRoutingModule {}
