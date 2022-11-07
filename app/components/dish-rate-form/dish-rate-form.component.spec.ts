import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishRateFormComponent } from './dish-rate-form.component';

describe('DishRateFormComponent', () => {
  let component: DishRateFormComponent;
  let fixture: ComponentFixture<DishRateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishRateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishRateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
