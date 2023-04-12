import { DefaultComponent } from '../shared/components/default/default.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { PostsManageComponent } from './components/posts-manage/posts-manage.component';
import { HiddenComponent } from '@demo-admin/shared/components/hidden/hidden.component';
import { MainGuard } from '../main/guards/main.guard';
import { AccessModeAltResolver } from '@demo-admin/shared/resolvers/access-mode-alt.resolver';
import { PostsResolver } from './posts.resolver';
import { ShortCategoriesResolver } from '../others/categories/resolvers/short-categories.resolver';

const children: Routes = [
  {
    path: ':managerId',
    component: HiddenComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    canActivate: [MainGuard],
    resolve: {
      accessMode: AccessModeAltResolver,
      shortCategories: ShortCategoriesResolver,
    },
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: '',
        component: PostsComponent,
      },
      {
        path: 'new',
        component: PostsManageComponent,
      },
      {
        path: 'edit',
        resolve: { news: PostsResolver },
        component: PostsManageComponent,
        children,
      },
      {
        path: 'view',
        resolve: { news: PostsResolver },
        component: PostsManageComponent,
        children,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
