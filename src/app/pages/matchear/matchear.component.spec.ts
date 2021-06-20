import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchearComponent } from './matchear.component';

describe('MatchearComponent', () => {
  let component: MatchearComponent;
  let fixture: ComponentFixture<MatchearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
