import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailMailPage } from './detail-mail.page';

describe('DetailMailPage', () => {
  let component: DetailMailPage;
  let fixture: ComponentFixture<DetailMailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailMailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
