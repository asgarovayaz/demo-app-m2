import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { PostsResolver } from './posts.resolver';

const routes: Routes = [
  { path: '', component: PostsComponent },
  {
    path: ':id',
    resolve: {
      posts: PostsResolver,
    },
    loadChildren: () =>
      import('./components/posts-detail/posts-detail.module').then(
        (m) => m.PostsDetailModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
