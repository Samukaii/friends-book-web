import { TestBed } from '@angular/core/testing';

import { UserProfilePostsRepositoryService } from './user-profile-posts-repository.service';

describe('MyProfilePostsRepositoryService', () => {
  let service: UserProfilePostsRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserProfilePostsRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
