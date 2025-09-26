import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentTransactionsChart } from './recent-transactions-chart';

describe('RecentTransactionsChart', () => {
  let component: RecentTransactionsChart;
  let fixture: ComponentFixture<RecentTransactionsChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentTransactionsChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentTransactionsChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
