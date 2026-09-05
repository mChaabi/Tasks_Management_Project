import { TestBed } from '@angular/core/testing';
import { ProjectHealth } from './project-health';

describe('ProjectHealth', () => {
  let service: ProjectHealth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectHealth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
