import { Injectable } from '@angular/core';
import {
  CanActivate,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStore } from '../stores/auth.store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authStore: AuthStore) {}
  canActivate(): Observable<boolean> {
   const isLogged = this.authStore.isLoggedIn$.pipe((logged) => 
      logged
    );
    return isLogged;
  }
}
