import { TestBed } from '@angular/core/testing';

import { AlbumsExchangeService } from './albums-exchange.service';

describe('AlbumsExchangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlbumsExchangeService = TestBed.get(AlbumsExchangeService);
    expect(service).toBeTruthy();
  });
});
