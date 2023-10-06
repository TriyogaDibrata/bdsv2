import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { AuthService } from './auth.service';
import { map } from 'rxjs';
import { ApiResponse } from '@interfaces/api-response';

@Injectable({
  providedIn: 'root',
})
export class UserNotificationService {
  user = this.auth.userData;

  constructor(
    private req: RequestService,
    private auth: AuthService,
  ) {}

  getUserNotif(page: number = 1) {
    let params = {
      page: page,
    };
    return this.req.apiGet(`notif/${this.user.id}`, params).pipe(
      map((res: ApiResponse) => {
        return res;
      }),
    );
  }
}
