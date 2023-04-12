import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { ApiResponse } from "../interfaces/api-response.interface";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  controller = 'storage';

  constructor(private apiService: ApiService) { }


  uploadFile(update: FormData): Observable<ApiResponse<number>> {
    return this.apiService.Post<ApiResponse<number>>(
      `${this.controller}`,
      update
    );
  }

}
