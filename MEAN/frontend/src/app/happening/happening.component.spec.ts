import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HappeningComponent } from './happening.component';

describe('HappeningComponent', () => {
  let component: HappeningComponent;
  let fixture: ComponentFixture<HappeningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HappeningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HappeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
