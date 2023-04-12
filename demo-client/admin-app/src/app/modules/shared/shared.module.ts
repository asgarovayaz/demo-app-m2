import { LoaderComponent } from "./components/loader/loader.component";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./components/footer/footer.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HotToastModule } from "@ngneat/hot-toast";
import { TopUserComponent } from "./components/top-user/top-user.component";
import { HiddenComponent } from "./components/hidden/hidden.component";
import { DefaultComponent } from "./components/default/default.component";
import { UserAvatarTextPipe } from "./pipes/user-avatar-text.pipe";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { StatusPipe } from "./pipes/status.pipe";
import { CategoryPipe } from "./pipes/category.pipe";
import { ContentPipe } from "./pipes/content.pipe";
@NgModule({
  declarations: [
    FooterComponent,
    NavigationComponent,
    TopUserComponent,
    DefaultComponent,
    HiddenComponent,
    NotFoundComponent,
    UserAvatarTextPipe,
    LoaderComponent,
    StatusPipe,
    CategoryPipe,
    ContentPipe,
  ],
  imports: [RouterModule, CommonModule, NgbModule, HotToastModule.forRoot()],
  exports: [
    FooterComponent,
    NavigationComponent,
    TopUserComponent,
    UserAvatarTextPipe,
    LoaderComponent,
    StatusPipe,
    CategoryPipe,
    ContentPipe,
  ],
})
export class SharedModule {}
