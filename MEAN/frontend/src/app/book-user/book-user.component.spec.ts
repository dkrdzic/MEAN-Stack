import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookUserComponent } from './book-user.component';

describe('BookUserComponent', () => {
  let component: BookUserComponent;
  let fixture: ComponentFixture<BookUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
