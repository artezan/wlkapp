import { TestBed } from '@angular/core/testing';

import { FbTicketsService } from './fb-tickets.service';

describe('FbTicketsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FbTicketsService = TestBed.get(FbTicketsService);
    expect(service).toBeTruthy();
  });
});
