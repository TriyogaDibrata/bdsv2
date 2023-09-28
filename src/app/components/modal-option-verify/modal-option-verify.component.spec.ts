import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalOptionVerifyComponent } from './modal-option-verify.component';

describe('ModalOptionVerifyComponent', () => {
  let component: ModalOptionVerifyComponent;
  let fixture: ComponentFixture<ModalOptionVerifyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalOptionVerifyComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalOptionVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
