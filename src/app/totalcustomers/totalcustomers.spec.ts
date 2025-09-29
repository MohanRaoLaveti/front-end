import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Totalcustomers } from './totalcustomers';

describe('Totalcustomers', () => {
  let component: Totalcustomers;
  let fixture: ComponentFixture<Totalcustomers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Totalcustomers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Totalcustomers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
