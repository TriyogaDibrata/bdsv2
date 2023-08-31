import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(
    private http: HttpClient,
    private env: EnvService,
  ) {}

  public apiGet(endpoint = '', params = {}) {
    return this.http.get(this.env.apiUrl + endpoint, { params: params }).pipe();
  }

  public apiPost(endpoint = '', body = {}) {
    return this.http.post(this.env.apiUrl + endpoint, body).pipe();
  }

  public apiPut(endpoint = '', id = '', params = {}) {
    return this.http
      .put(this.env.apiUrl + endpoint + id, {}, { params: params })
      .pipe();
  }

  public apiDelete(endpoint = '', id = '') {
    return this.http.delete(this.env.apiUrl + endpoint + id).pipe();
  }
}
