import { ICategories } from "./models/categories.interface";
import { Injectable } from "@angular/core";
import { ApiService } from "@demo-admin/shared/services/api.service";
import { Observable, map } from "rxjs";
import { ApiResponse } from "@demo-admin/shared/interfaces/api-response.interface";
import { Paginate } from "@demo-admin/shared/interfaces/paginate";
import { ICreateCategories } from "./models/create-categories.interface";
import { IUpdateCategories } from "./models/update-categories.interface";

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  controller = "categories-admin";
  controllerShort = "categories";

  constructor(private apiService: ApiService) {}

  getPagedAll(page = 1, limit = 10): Observable<Paginate<ICategories[]>> {
    return this.apiService
      .Get<ApiResponse<Paginate<ICategories[]>>>(
        `${this.controller}?page=${page}&limit=${limit}`
      )
      .pipe(map((result) => result.data));
  }

  getShortAll(): Observable<ICategories> {
    return this.apiService
      .Get<ApiResponse<ICategories>>(`${this.controllerShort}`)
      .pipe(map((result) => result.data));
  }

  getOne(newsId: number): Observable<ICategories> {
    return this.apiService
      .Get<ApiResponse<ICategories>>(`${this.controller}/${newsId}`)
      .pipe(map((result) => result.data));
  }

  create(create: ICreateCategories): Observable<ApiResponse<ICategories>> {
    return this.apiService.Post<ApiResponse<ICategories>>(
      `${this.controller}`,
      create
    );
  }

  update(update: IUpdateCategories): Observable<ApiResponse<ICategories>> {
    return this.apiService.Put<ApiResponse<ICategories>>(
      `${this.controller}`,
      update
    );
  }
}
