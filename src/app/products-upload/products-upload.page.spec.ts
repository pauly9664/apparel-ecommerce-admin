import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductsUploadPage } from './products-upload.page';

describe('ProductsUploadPage', () => {
  let component: ProductsUploadPage;
  let fixture: ComponentFixture<ProductsUploadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsUploadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsUploadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
