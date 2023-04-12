import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { AuthStore } from '@demo-admin/auth/stores/auth.store';
import { UserModel } from '@demo-admin/auth/models/user.model';

@Component({
  selector: 'demo-admin-top-user',
  templateUrl: './top-user.component.html',
  styleUrls: ['./top-user.component.scss'],
})
export class TopUserComponent implements OnInit {
  @Input() isRoleAdmin!: Observable<boolean>;
  @Input() user$!: Observable<UserModel>;

  constructor(private authStore: AuthStore) {}

  ngOnInit(): void {
    this.user$ = this.authStore.user$;
  }

  signOut() {
    this.authStore.logout();
  }
}
