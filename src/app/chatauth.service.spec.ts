import { TestBed } from '@angular/core/testing';

import { ChatauthService } from './chatauth.service';

describe('ChatauthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatauthService = TestBed.get(ChatauthService);
    expect(service).toBeTruthy();
  });
});
