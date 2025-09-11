import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Request Received: ${req.method} ${JSON.stringify(req.body)}`);

    // This is the equivalent of Laravel's $next($request).
    // It passes control to the next middleware in the stack.
    next();
  }
}
