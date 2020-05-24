import { TestBed, async, inject } from '@angular/core/testing';

import { IsloggedinauthGuard } from './isloggedinauth.guard';

describe('IsloggedinauthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsloggedinauthGuard]
    });
  });

  it('should ...', inject([IsloggedinauthGuard], (guard: IsloggedinauthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
