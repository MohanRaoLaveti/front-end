import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bankerdashboard } from './bankerdashboard';

describe('Bankerdashboard', () => {
  let component: Bankerdashboard;
  let fixture: ComponentFixture<Bankerdashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bankerdashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bankerdashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
