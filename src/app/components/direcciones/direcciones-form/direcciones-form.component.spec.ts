import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DireccionesFormComponent } from './direcciones-form.component';

describe('DireccionesFormComponent', () => {
  let component: DireccionesFormComponent;
  let fixture: ComponentFixture<DireccionesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DireccionesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DireccionesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
