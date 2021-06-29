import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimasImportacionesComponent } from './ultimas-importaciones.component';

describe('UltimasImportacionesComponent', () => {
  let component: UltimasImportacionesComponent;
  let fixture: ComponentFixture<UltimasImportacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UltimasImportacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UltimasImportacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
