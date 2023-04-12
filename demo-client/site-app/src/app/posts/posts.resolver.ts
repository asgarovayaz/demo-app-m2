import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IShortPosts } from './models/short-posts.interface';
import { PostsService } from './posts.service';

@Injectable({
  providedIn: 'root',
})
export class PostsResolver {
  constructor(private postsService: PostsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IShortPosts> {
    const id: number = route.params['id'];
    return this.postsService.getOne(id);
  }
}
