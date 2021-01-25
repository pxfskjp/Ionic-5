import { TestBed, async, inject } from '@angular/core/testing';

import { ReAuthGuard } from './re-auth.guard';

describe('ReAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReAuthGuard]
    });
  });

  it('should ...', inject([ReAuthGuard], (guard: ReAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
