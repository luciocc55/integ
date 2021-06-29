import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTarjetaComponent } from './item-tarjeta.component';

describe('ItemTarjetaComponent', () => {
  let component: ItemTarjetaComponent;
  let fixture: ComponentFixture<ItemTarjetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTarjetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
