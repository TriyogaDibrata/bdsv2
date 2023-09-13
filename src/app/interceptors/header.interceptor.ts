import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { LoadingService } from '@services/loading.service';
import { throwError } from 'rxjs';
import { Observable, catchError, finalize } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private loader: LoadingService,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    this.loader.isLoading.next(true);
    let headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const user = this.auth.userData;
    if (user && user.api_token) {
      headers['authorization'] = 'Bearer ' + user.api_token;
    }

    const request = req.clone({
      setHeaders: headers,
    });

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err);
      }),
      finalize(() => {
        this.loader.isLoading.next(false);
      }),
    );
  }
}
