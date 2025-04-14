import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const apiUrl = environment.apiUrl;

    if (req.url.startsWith('http')) {
      return next.handle(req);
    }

    const apiReq = req.clone({
      url: `${apiUrl}${req.url}`
    });

    return next.handle(apiReq);
  }
}
