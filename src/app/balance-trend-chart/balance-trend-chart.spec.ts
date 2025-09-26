import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceTrendChart } from './balance-trend-chart';

describe('BalanceTrendChart', () => {
  let component: BalanceTrendChart;
  let fixture: ComponentFixture<BalanceTrendChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceTrendChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanceTrendChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
