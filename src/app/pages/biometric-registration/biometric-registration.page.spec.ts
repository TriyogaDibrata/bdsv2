import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BiometricRegistrationPage } from './biometric-registration.page';

describe('BiometricRegistrationPage', () => {
  let component: BiometricRegistrationPage;
  let fixture: ComponentFixture<BiometricRegistrationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BiometricRegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
