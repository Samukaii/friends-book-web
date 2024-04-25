import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCardListLoadingComponent } from './users-card-list-loading.component';

describe('UsersCardListLoadingComponent', () => {
  let component: UsersCardListLoadingComponent;
  let fixture: ComponentFixture<UsersCardListLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersCardListLoadingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersCardListLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
