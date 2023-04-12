import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import {
  catchError,
  delay,
  map,
  Observable,
  switchMap,
  throwError,
} from "rxjs";
import { AuthService } from "@demo-admin/auth/services/auth.service";
import { HotToastService } from "@ngneat/hot-toast";
import { AuthStore } from "@demo-admin/auth/stores/auth.store";
import { Router } from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(
    private toastService: HotToastService,
    private authService: AuthService,
    private authStore: AuthStore
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({ withCredentials: true });

    return next.handle(request).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !request.url.includes("auth/sign-in") &&
          error.status === 401
        ) {
          return this.handle401Error(request, next);
        }

        if (error instanceof HttpErrorResponse && error.status !== 401) {
          this.toastService.error(error.error.message);
        }

        return throwError(() => {
          this.toastService.error(error.message, { duration: 4000 });
        });
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      return this.authStore.isLoggedIn$.pipe(
        delay(1000),
        switchMap((isLoggedIn) => {
          if (isLoggedIn) {
            return this.authService.refresh().pipe(
              switchMap(() => {
                this.isRefreshing = false;
                return next.handle(request);
              }),
              catchError((error) => {
                this.isRefreshing = false;
                return throwError(() => {
                  if (
                    error instanceof HttpErrorResponse &&
                    !request.url.includes("auth/sign-in") &&
                    error.status === 401
                  ) {
                    sessionStorage.removeItem("usr");
                  }
                });
              })
            );
          }
          return next.handle(request);
        })
      );
    }
    return next.handle(request);
  }
}
