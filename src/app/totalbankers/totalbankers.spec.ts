import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Totalbankers } from './totalbankers';

describe('Totalbankers', () => {
  let component: Totalbankers;
  let fixture: ComponentFixture<Totalbankers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Totalbankers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Totalbankers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
