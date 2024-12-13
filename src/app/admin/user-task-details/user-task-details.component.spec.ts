import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTaskDetailsComponent } from './user-task-details.component';

describe('UserTaskDetailsComponent', () => {
  let component: UserTaskDetailsComponent;
  let fixture: ComponentFixture<UserTaskDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTaskDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
