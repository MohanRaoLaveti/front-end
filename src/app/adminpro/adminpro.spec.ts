import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adminpro } from './adminpro';

describe('Adminpro', () => {
  let component: Adminpro;
  let fixture: ComponentFixture<Adminpro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adminpro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adminpro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
