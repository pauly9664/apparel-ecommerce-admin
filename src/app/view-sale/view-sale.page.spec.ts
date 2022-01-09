import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewSalePage } from './view-sale.page';

describe('ViewSalePage', () => {
  let component: ViewSalePage;
  let fixture: ComponentFixture<ViewSalePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSalePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewSalePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
