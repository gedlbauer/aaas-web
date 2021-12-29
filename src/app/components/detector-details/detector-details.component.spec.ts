import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectorDetailsComponent } from './detector-details.component';

describe('DetectorDetailsComponent', () => {
  let component: DetectorDetailsComponent;
  let fixture: ComponentFixture<DetectorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetectorDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
