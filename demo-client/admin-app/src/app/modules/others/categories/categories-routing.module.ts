import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from '@demo-admin/shared/components/default/default.component';
import { HiddenComponent } from '@demo-admin/shared/components/hidden/hidden.component';
import { MainGuard } from '../../main/guards/main.guard';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoriesResolver } from './resolvers/categories.resolver';
import { AccessModeResolver } from '@demo-admin/shared/resolvers/access-mode.resolver';
import { CategoriesManageComponent } from './components/categories-manage/categories-manage.component';

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
      accessMode: AccessModeResolver,
    },
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: '',
        component: CategoriesComponent,
      },
      {
        path: 'new',
        component: CategoriesManageComponent,
      },
      {
        path: 'edit',
        resolve: { categories: CategoriesResolver },
        component: CategoriesManageComponent,
        children,
      },
      {
        path: 'view',
        resolve: { categories: CategoriesResolver },
        component: CategoriesManageComponent,
        children,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
