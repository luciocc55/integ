import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelacionesTableComponent } from './relaciones-table.component';

describe('RelacionesTableComponent', () => {
  let component: RelacionesTableComponent;
  let fixture: ComponentFixture<RelacionesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelacionesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelacionesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
