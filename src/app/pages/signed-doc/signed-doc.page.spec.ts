import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignedDocPage } from './signed-doc.page';

describe('SignedDocPage', () => {
  let component: SignedDocPage;
  let fixture: ComponentFixture<SignedDocPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SignedDocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
