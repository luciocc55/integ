import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatcheosTableComponent } from './matcheos-table.component';

describe('MatcheosTableComponent', () => {
  let component: MatcheosTableComponent;
  let fixture: ComponentFixture<MatcheosTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatcheosTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatcheosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
