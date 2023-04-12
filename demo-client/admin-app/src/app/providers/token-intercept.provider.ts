import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from "../interceptors/token.interceptor";

export const TokenInterceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
];
