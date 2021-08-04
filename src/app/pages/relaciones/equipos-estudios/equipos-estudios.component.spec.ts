import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiposEstudiosComponent } from './equipos-estudios.component';

describe('EquiposEstudiosComponent', () => {
  let component: EquiposEstudiosComponent;
  let fixture: ComponentFixture<EquiposEstudiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquiposEstudiosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquiposEstudiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
