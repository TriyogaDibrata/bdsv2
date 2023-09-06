import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewDocPage } from './new-doc.page';

describe('NewDocPage', () => {
  let component: NewDocPage;
  let fixture: ComponentFixture<NewDocPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewDocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
