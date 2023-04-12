import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserModel } from '@demo-admin/auth/models/user.model';
import { AuthStore } from '@demo-admin/auth/stores/auth.store';
import { ChangePasswordModel } from '@demo-admin/profile/models/change-password.model';
import { ProfileService } from '@demo-admin/profile/services/profile.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-security-settings',
  templateUrl: './security-settings.component.html',
})
export class SecuritySettingsComponent implements OnInit, OnDestroy {
  userInfo!: UserModel;
  isInputNotSame = false;
  isChangePassword = false;
  changePasswordData: ChangePasswordModel = {
    UserId: undefined,
    OldPassword: undefined,
    NewPassword: undefined,
    NewRePassword: undefined,
  };

  subscriptions$ = new Subscription();

  constructor(
    private authStore: AuthStore,
    private profileService: ProfileService,
    private toastService: HotToastService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

  ngOnInit(): void {
    this.subscriptions$.add(
      this.authStore.user$.subscribe((user) => {
        this.userInfo = user;
      })
    );
  }

  onKeyup(){
    this.isInputNotSame = false;
  }

  savePassword(): void {
    if (!this.changePasswordData.OldPassword) {
      this.toastService.warning('Köhnə şifrə boş ola bilməz.', {
        duration: 4000,
      });
      this.isInputNotSame = true;
      return;
    }

    if (!this.changePasswordData.NewPassword) {
      this.toastService.warning('Yeni şifrə boş ola bilməz.', {
        duration: 4000,
      });
      this.isInputNotSame = true;
      return;
    }

    if (!this.changePasswordData.NewRePassword) {
      this.toastService.warning('Təkrar şifrə boş ola bilməz.', {
        duration: 4000,
      });
      this.isInputNotSame = true;
      return;
    }

    if (
      this.changePasswordData.NewPassword !==
      this.changePasswordData.NewRePassword
    ) {
      this.toastService.warning('Yeni şifrə ilə təkrar şifrə eyni deyil.', {
        duration: 4000,
      });
      this.isInputNotSame = true;
      return;
    }

    this.changePasswordData.UserId = this.userInfo.UserId;

    const update = this.changePasswordData;

    this.subscriptions$.add(
      this.profileService.updatePassword(update).subscribe((result) => {
        if (result.statusCode === 200) {
          this.changePasswordData = {
            UserId: undefined,
            OldPassword: undefined,
            NewPassword: undefined,
            NewRePassword: undefined,
          };
          this.isChangePassword = false;
          this.toastService.success('Müvəffəqiyyətlə yeniləndi.', {
            duration: 5000,
          });
        }
      })
    );
  }
}
