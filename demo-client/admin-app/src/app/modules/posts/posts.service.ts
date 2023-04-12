import { Injectable } from '@angular/core';
import { ApiService } from '@demo-admin/shared/services/api.service';
import { ICreatePosts } from './models/create-posts.interface';
import { ApiResponse } from '@demo-admin/shared/interfaces/api-response.interface';
import { Observable, map } from 'rxjs';
import { IPosts } from './models/posts.interface';
import { IUpdatePosts } from './models/update-posts.interface';
import { Paginate } from '@demo-admin/shared/interfaces/paginate';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  controller = 'posts-admin';

  constructor(private apiService: ApiService) {}

  getPagedAll(
    page = 1,
    limit = 10,
  ): Observable<Paginate<IPosts[]>> {
    return this.apiService
      .Get<ApiResponse<Paginate<IPosts[]>>>(
        `${this.controller}?page=${page}&limit=${limit}`
      )
      .pipe(map((result) => result.data));
  }

  getOne(postsId: number): Observable<IPosts> {
    return this.apiService
      .Get<ApiResponse<IPosts>>(`${this.controller}/${postsId}`)
      .pipe(map((result) => result.data));
  }

  create(create: ICreatePosts): Observable<ApiResponse<IPosts>> {
    return this.apiService.Post<ApiResponse<IPosts>>(
      `${this.controller}`,
      create
    );
  }

  update(update: IUpdatePosts): Observable<ApiResponse<IPosts>> {
    return this.apiService.Put<ApiResponse<IPosts>>(
      `${this.controller}`,
      update
    );
  }
}
