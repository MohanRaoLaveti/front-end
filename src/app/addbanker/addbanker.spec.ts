import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addbanker } from './addbanker';

describe('Addbanker', () => {
  let component: Addbanker;
  let fixture: ComponentFixture<Addbanker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addbanker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addbanker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
