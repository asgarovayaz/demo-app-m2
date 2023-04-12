import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserModel } from '@demo-admin/auth/models/user.model';
import { AuthStore } from '@demo-admin/auth/stores/auth.store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit, OnDestroy {
  userInfo!: UserModel;

  subscriptions$ = new Subscription();
  constructor(private authStore: AuthStore) {}

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
}
