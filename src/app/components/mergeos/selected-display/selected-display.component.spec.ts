import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedDisplayComponent } from './selected-display.component';

describe('SelectedDisplayComponent', () => {
  let component: SelectedDisplayComponent;
  let fixture: ComponentFixture<SelectedDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
