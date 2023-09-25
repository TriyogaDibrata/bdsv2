import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalRiwayatDisposisiComponent } from './modal-riwayat-disposisi.component';

describe('ModalRiwayatDisposisiComponent', () => {
  let component: ModalRiwayatDisposisiComponent;
  let fixture: ComponentFixture<ModalRiwayatDisposisiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRiwayatDisposisiComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalRiwayatDisposisiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
