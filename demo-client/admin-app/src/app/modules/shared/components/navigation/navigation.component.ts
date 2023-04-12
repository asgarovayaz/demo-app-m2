import { map, Subscription, Observable } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'admin-app/src/environments/environment';
import { AuthStore } from '@demo-admin/auth/stores/auth.store';

@Component({
  selector: 'demo-admin-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  defaultLogo: string = '/assets/icons/icon-144x144.png';
  defaultName: string = 'DEMO Admin';
  defaultAcronym: string = 'M2';
  subscriptions$: Subscription = new Subscription();

  constructor(
    private authStore: AuthStore,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    if (this.subscriptions$) this.subscriptions$.unsubscribe();
  }

  ngOnInit(): void {}
}
