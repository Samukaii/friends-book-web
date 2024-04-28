import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFriendsListLoadingComponent } from './search-friends-list-loading.component';

describe('SearchFriendsListLoadingComponent', () => {
  let component: SearchFriendsListLoadingComponent;
  let fixture: ComponentFixture<SearchFriendsListLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFriendsListLoadingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchFriendsListLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
