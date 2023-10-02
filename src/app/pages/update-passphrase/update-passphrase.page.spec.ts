import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatePassphrasePage } from './update-passphrase.page';

describe('UpdatePassphrasePage', () => {
  let component: UpdatePassphrasePage;
  let fixture: ComponentFixture<UpdatePassphrasePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdatePassphrasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
