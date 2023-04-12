import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "others/categories",
  },
  {
    path: "categories",
    loadChildren: () =>
      import("./categories/categories.module").then((m) => m.CategoriesModule),
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OthersRoutingModule {}
