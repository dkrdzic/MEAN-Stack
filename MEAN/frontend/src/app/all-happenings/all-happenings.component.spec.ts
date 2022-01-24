import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AllHappeningsComponent } from "./all-happenings.component";

describe("AllHappeningsComponent", () => {
  let component: AllHappeningsComponent;
  let fixture: ComponentFixture<AllHappeningsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllHappeningsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllHappeningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
