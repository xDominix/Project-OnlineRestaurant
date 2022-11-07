import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingcartinfoComponent } from './shoppingcartinfo.component';

describe('ShoppingcartinfoComponent', () => {
  let component: ShoppingcartinfoComponent;
  let fixture: ComponentFixture<ShoppingcartinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingcartinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingcartinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
