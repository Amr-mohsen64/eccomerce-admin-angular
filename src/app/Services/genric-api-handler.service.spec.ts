import { TestBed } from '@angular/core/testing';

import { GenricApiHandlerService } from './genric-api-handler.service';

describe('GenricApiHandlerService', () => {
  let service: GenricApiHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenricApiHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
