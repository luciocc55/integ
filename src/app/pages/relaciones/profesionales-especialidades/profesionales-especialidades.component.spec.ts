import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalesEspecialidadesComponent } from './profesionales-especialidades.component';

describe('ProfesionalesEspecialidadesComponent', () => {
  let component: ProfesionalesEspecialidadesComponent;
  let fixture: ComponentFixture<ProfesionalesEspecialidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesionalesEspecialidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalesEspecialidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
