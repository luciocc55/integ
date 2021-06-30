import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeosGraficoComponent } from './mergeos-grafico.component';

describe('MergeosGraficoComponent', () => {
  let component: MergeosGraficoComponent;
  let fixture: ComponentFixture<MergeosGraficoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MergeosGraficoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeosGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
