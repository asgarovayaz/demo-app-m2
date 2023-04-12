import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthStore } from '@demo-admin/auth/stores/auth.store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainGuard implements CanActivate {
  constructor(private authStore: AuthStore, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    this.authStore.isLoggedIn$.subscribe((s) => {
      if (!s) {
        this.router.navigateByUrl('/auth/sign-in')
      }
    });
    return this.authStore.isLoggedIn$;
  }
}
