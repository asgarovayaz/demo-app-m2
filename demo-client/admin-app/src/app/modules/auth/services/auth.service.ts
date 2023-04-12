import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "@demo-admin/shared/services/api.service";
import { ApiResponse } from "@demo-admin/shared/interfaces/api-response.interface";
import { AuthModel } from "../models/auth.model";
import { UserModel } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  controller = "auth";

  constructor(private apiService: ApiService) {}

  signIn(Credentials: AuthModel): Observable<ApiResponse<UserModel>> {
    return this.apiService.Post<ApiResponse<UserModel>>(
      `${this.controller}/sign-in`,
      Credentials
    );
  }

  signOut(): Observable<unknown> {
    return this.apiService.PostAlt(`${this.controller}/sign-out`);
  }

  check(): Observable<ApiResponse<UserModel>> {
    return this.apiService.Get<ApiResponse<UserModel>>(this.controller);
  }

  refresh(): Observable<ApiResponse<UserModel>> {
    return this.apiService.Get<ApiResponse<UserModel>>(
      `${this.controller}/refresh`
    );
  }
}
