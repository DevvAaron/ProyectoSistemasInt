import { TestBed } from '@angular/core/testing';

import { RoboflowApiService } from './roboflow-api.service';

describe('RoboflowApiService', () => {
  let service: RoboflowApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoboflowApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
