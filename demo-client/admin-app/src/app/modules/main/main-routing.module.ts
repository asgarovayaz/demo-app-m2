import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "@demo-admin/shared/components/not-found/not-found.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { MainGuard } from "./guards/main.guard";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("../auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "profile",
    canActivate: [MainGuard],
    component: LayoutComponent,
    loadChildren: () =>
      import("../profile/profile.module").then((m) => m.ProfileModule),
  },
  {
    path: "posts",
    canActivate: [MainGuard],
    component: LayoutComponent,
    loadChildren: () => import("../posts/posts.module").then((m) => m.PostsModule),
  },
  {
    path: "others",
    canActivate: [MainGuard],
    component: LayoutComponent,
    loadChildren: () =>
      import("../others/others.module").then((m) => m.OthersModule),
  },
  {
    path: "",
    canActivate: [MainGuard],
    component: LayoutComponent,
    loadChildren: () =>
      import("../dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
