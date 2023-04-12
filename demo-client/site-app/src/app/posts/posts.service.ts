import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IShortPosts } from './models/short-posts.interface';
import { ApiService } from '@demo-user/shared/services/api.service';
import { Paginate } from '@demo-user/shared/interfaces/paginate';
import { ApiResponse } from '@demo-user/shared/interfaces/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  controller = 'posts';

  constructor(private apiService: ApiService) {}

  getPagedAll(
    page = 1,
    limit = 10,
  ): Observable<Paginate<IShortPosts[]>> {
    return this.apiService
      .Get<ApiResponse<Paginate<IShortPosts[]>>>(
        `${this.controller}?page=${page}&limit=${limit}`
      )
      .pipe(map((result) => result.data));
  }

  getOne(newsId: number): Observable<IShortPosts> {
    return this.apiService
      .Get<ApiResponse<IShortPosts>>(`${this.controller}/${newsId}`)
      .pipe(map((result) => result.data));
  }
}
