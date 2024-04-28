import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFriendsListComponent } from './search-friends-list.component';

describe('SearchFriendsListComponent', () => {
  let component: SearchFriendsListComponent;
  let fixture: ComponentFixture<SearchFriendsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFriendsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchFriendsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
