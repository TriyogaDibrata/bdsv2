import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.badungkab.digital_signature',
  appName: 'Badung Digital Signature',
  webDir: 'www',
  server: {
    androidScheme: 'https',
  },
  ios: {
    preferredContentMode: 'mobile',
  },
};

export default config;
