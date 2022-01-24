import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SeeUserProfileComponent } from "./see-user-profile.component";

describe("SeeUserProfileComponent", () => {
  let component: SeeUserProfileComponent;
  let fixture: ComponentFixture<SeeUserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeeUserProfileComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
