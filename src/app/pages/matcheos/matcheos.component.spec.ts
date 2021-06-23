import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatcheosComponent } from './matcheos.component';

describe('MatcheosComponent', () => {
  let component: MatcheosComponent;
  let fixture: ComponentFixture<MatcheosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatcheosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatcheosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
