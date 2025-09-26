import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycUpdates } from './kyc-updates';

describe('KycUpdates', () => {
  let component: KycUpdates;
  let fixture: ComponentFixture<KycUpdates>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KycUpdates]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KycUpdates);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
