import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeoTableComponent } from './mergeo-table.component';

describe('MergeoTableComponent', () => {
  let component: MergeoTableComponent;
  let fixture: ComponentFixture<MergeoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MergeoTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
