import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedasTableComponent } from './busquedas-table.component';

describe('BusquedasTableComponent', () => {
  let component: BusquedasTableComponent;
  let fixture: ComponentFixture<BusquedasTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedasTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
