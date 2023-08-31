import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnvService {
  constructor() {}

  public get apiUrl() {
    return environment.url.demo;
  }
}
