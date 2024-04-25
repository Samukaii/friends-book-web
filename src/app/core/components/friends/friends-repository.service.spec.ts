import { TestBed } from '@angular/core/testing';

import { FriendsRepositoryService } from './friends-repository.service';

describe('FriendsRepositoryService', () => {
  let service: FriendsRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendsRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
