import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoaderInterceptor } from "../interceptors/loader.interceptor";

export const LoaderInterceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
];
