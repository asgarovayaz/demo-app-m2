import { Injectable } from '@angular/core';
import {
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PostsService } from './posts.service';
import { IPosts } from './models/posts.interface';
import { IAccessModeAlt } from '@demo-admin/shared/models/access-mode-alt.model';

@Injectable({
  providedIn: 'root',
})
export class PostsResolver {
  constructor(private postsService: PostsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IPosts> {
    const accessMode: IAccessModeAlt = route.parent?.data['accessMode'];
    return this.postsService.getOne(accessMode.ModuleId as number);
  }
}
