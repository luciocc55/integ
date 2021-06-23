import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastPreguntaComponent } from './toast-pregunta.component';

describe('ToastPreguntaComponent', () => {
  let component: ToastPreguntaComponent;
  let fixture: ComponentFixture<ToastPreguntaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToastPreguntaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
