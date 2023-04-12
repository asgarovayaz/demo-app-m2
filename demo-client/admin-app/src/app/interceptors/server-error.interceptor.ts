import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { HotToastService } from "@ngneat/hot-toast";
import { AuthService } from "@demo-admin/auth/services/auth.service";

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(private toastService: HotToastService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        this.toastService.error(error.error.message);
        return throwError(() => {});
      })
    );
  }
}
