import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeoButtonComponent } from './mergeo-button.component';

describe('MergeoButtonComponent', () => {
  let component: MergeoButtonComponent;
  let fixture: ComponentFixture<MergeoButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MergeoButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
