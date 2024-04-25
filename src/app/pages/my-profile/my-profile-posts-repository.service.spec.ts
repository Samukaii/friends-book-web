import { TestBed } from '@angular/core/testing';

import { MyProfilePostsRepositoryService } from './my-profile-posts-repository.service';

describe('MyProfilePostsRepositoryService', () => {
  let service: MyProfilePostsRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyProfilePostsRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
