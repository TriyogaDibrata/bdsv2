import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalUplaodDisposisiComponent } from './modal-uplaod-disposisi.component';

describe('ModalUplaodDisposisiComponent', () => {
  let component: ModalUplaodDisposisiComponent;
  let fixture: ComponentFixture<ModalUplaodDisposisiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUplaodDisposisiComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalUplaodDisposisiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
