import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HealthScoreCard } from './health-score-card';

describe('HealthScoreCard', () => {
  let component: HealthScoreCard;
  let fixture: ComponentFixture<HealthScoreCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthScoreCard],
    }).compileComponents();

    fixture = TestBed.createComponent(HealthScoreCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
