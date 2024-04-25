import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoLoadingComponent } from './user-info-loading.component';

describe('UserInfoLoadingComponent', () => {
  let component: UserInfoLoadingComponent;
  let fixture: ComponentFixture<UserInfoLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInfoLoadingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserInfoLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
