import { ApiResponse } from '@api-common/interfaces/api-response.interface';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  StreamableFile,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof StreamableFile) return data;
        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          data,
        };
      }),
    );
  }
}
