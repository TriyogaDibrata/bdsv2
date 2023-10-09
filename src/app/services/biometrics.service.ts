import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { NativeBiometric } from '@capgo/capacitor-native-biometric';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BiometricsService {
  constructor() {}

  async checkAvailablity() {
    const result = await NativeBiometric.isAvailable();
    return await result;
  }

  async performBiometrics() {
    return await NativeBiometric.verifyIdentity({
      reason: 'For easy login and sign document',
      title: 'Verify User Identity',
    });
  }

  async setCredential(username, password) {
    const platfrom = await Capacitor.getPlatform();
    return await NativeBiometric.setCredentials({
      server: 'com.badungkab.digitalsignature',
      username: username,
      password: password,
    });
  }

  async deleteCredential() {
    const platfrom = await Capacitor.getPlatform();
    return await NativeBiometric.deleteCredentials({
      server: 'com.badungkab.digitalsignature',
    });
  }

  async getCredential() {
    const platfrom = await Capacitor.getPlatform();
    return await NativeBiometric.getCredentials({
      server: 'com.badungkab.digitalsignature',
    });
  }
}
