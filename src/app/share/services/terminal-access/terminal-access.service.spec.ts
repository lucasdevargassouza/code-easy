import { TestBed } from '@angular/core/testing';

import { TerminalAccessService } from './terminal-access.service';

describe('TerminalAccessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TerminalAccessService = TestBed.get(TerminalAccessService);
    expect(service).toBeTruthy();
  });
});
