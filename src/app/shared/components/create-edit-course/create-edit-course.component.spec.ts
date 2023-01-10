import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditCourseComponent } from './create-edit-course.component';

describe('CreateEditCourseComponent', () => {
  let component: CreateEditCourseComponent;
  let fixture: ComponentFixture<CreateEditCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
