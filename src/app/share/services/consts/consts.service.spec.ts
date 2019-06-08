import { TestBed } from '@angular/core/testing';

import { CONSTSService } from './consts.service';

describe('CONSTSService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CONSTSService = TestBed.get(CONSTSService);
    expect(service).toBeTruthy();
  });
});
