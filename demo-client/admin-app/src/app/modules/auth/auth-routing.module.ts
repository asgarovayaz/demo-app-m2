import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthComponent } from "./components/auth/auth.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";

const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
    children: [
      {
        path: "",
        redirectTo: "sign-in",
        pathMatch: "full",
      },
      {
        path: "sign-in",
        component: SignInComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
