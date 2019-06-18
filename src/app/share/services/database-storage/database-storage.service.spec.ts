import { TestBed } from '@angular/core/testing';

import { DatabaseStorageService } from './database-storage.service';

describe('DatabaseStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatabaseStorageService = TestBed.get(DatabaseStorageService);
    expect(service).toBeTruthy();
  });
});
