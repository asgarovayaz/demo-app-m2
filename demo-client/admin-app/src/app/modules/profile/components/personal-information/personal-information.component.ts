import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthStore } from '@demo-admin/auth/stores/auth.store';
import { ProfileModel } from '@demo-admin/profile/models/profile.model';
import { ProfileService } from '@demo-admin/profile/services/profile.service';
import { UserModel } from '@demo-admin/auth/models/user.model';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
})
export class PersonalInformationComponent implements OnInit, OnDestroy {
  userInfo!: UserModel;

  isNameEdit = false;
  editNameText = '';

  isSurnameEdit = false;
  editSurnameText = '';

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

  onEdit(field = 'name') {
    switch (field) {
      case 'name':
        this.editNameText = this.userInfo.Name as string;
        this.isNameEdit = true;
        this.isSurnameEdit = false;
        break;
      case 'surname':
        this.editSurnameText = this.userInfo.Surname as string;
        this.isSurnameEdit = true;
        this.isNameEdit = false;
        break;
    }
  }

  onSave(field = 'name') {
    const update: ProfileModel = {
      UserId: this.userInfo.UserId,
    };
    switch (field) {
      case 'name':
        update.Name = this.editNameText;
        break;
      case 'surname':
        update.Surname = this.editSurnameText;
        break;
    }

    this.subscriptions$.add(
      this.profileService.update(update).subscribe((result) => {
        if (result.statusCode === 200) {
          this.editNameText = '';
          this.editSurnameText = '';
          this.isNameEdit = false;
          this.isSurnameEdit = false;
          this.toastService.success('Müvəffəqiyyətlə yeniləndi.', {
            duration: 5000,
          });
          this.authStore.check();
        }
      })
    );
  }
}
