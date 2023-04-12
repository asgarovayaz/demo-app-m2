import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProfileModel } from '../models/profile.model';
import { ChangePasswordModel } from '../models/change-password.model';
import { ApiResponse } from '@demo-admin/shared/interfaces/api-response.interface';
import { ApiService } from '@demo-admin/shared/services/api.service';
import { UserModel } from '@demo-admin/auth/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private apiService: ApiService) {}

  update(update: ProfileModel): Observable<ApiResponse<UserModel>> {
    return this.apiService.Put<ApiResponse<UserModel>>(
      'users',
      update
    );
  }

  updatePassword(update: ChangePasswordModel): Observable<ApiResponse<UserModel>> {
    return this.apiService.Put<ApiResponse<UserModel>>(
      'users/update-password',
      update
    );
  }
}
