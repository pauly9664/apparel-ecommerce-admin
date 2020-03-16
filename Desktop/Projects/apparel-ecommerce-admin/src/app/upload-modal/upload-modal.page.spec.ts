import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UploadModalPage } from './upload-modal.page';

describe('UploadModalPage', () => {
  let component: UploadModalPage;
  let fixture: ComponentFixture<UploadModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
