import { TestBed } from '@angular/core/testing';

import { EmissorEventosService } from './emissor-eventos.service';

describe('EmissorEventosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmissorEventosService = TestBed.get(EmissorEventosService);
    expect(service).toBeTruthy();
  });
});
