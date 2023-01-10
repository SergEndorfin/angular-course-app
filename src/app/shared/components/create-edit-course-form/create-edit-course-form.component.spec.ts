import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditCourseFormComponent } from './create-edit-course-form.component';

describe('CreateEditCourseFormComponent', () => {
  let component: CreateEditCourseFormComponent;
  let fixture: ComponentFixture<CreateEditCourseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditCourseFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditCourseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
