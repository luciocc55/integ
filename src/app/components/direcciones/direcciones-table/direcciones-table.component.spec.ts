import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DireccionesTableComponent } from './direcciones-table.component';

describe('DireccionesTableComponent', () => {
  let component: DireccionesTableComponent;
  let fixture: ComponentFixture<DireccionesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DireccionesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DireccionesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
