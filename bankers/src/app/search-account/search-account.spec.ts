import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAccount } from './search-account';

describe('SearchAccount', () => {
  let component: SearchAccount;
  let fixture: ComponentFixture<SearchAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchAccount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchAccount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
