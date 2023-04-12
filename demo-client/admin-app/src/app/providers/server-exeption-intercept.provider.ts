import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ServerErrorInterceptor } from "../interceptors/server-error.interceptor";

export const ServerExeptionInterceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
];
