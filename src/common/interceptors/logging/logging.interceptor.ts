import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: any = context.switchToHttp().getRequest();
    const { method, url } = request;

    // before Controller method run.
    console.log(`[Before] Request to ${method} ${url} started...`);

    const now = Date.now();
    return next.handle().pipe(
      // Controller method run ပြီးလို့ data ပြန်လာမှ အလုပ်လုပ်မယ့် အပိုင်း
      tap(() =>
        console.log(
          `[After] Request to ${method} ${url} took ${Date.now() - now}ms`,
        ),
      ),
    );
  }
}
