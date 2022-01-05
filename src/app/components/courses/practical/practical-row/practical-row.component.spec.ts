import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticalRowComponent } from './practical-row.component';

describe('PracticalRowComponent', () => {
  let component: PracticalRowComponent;
  let fixture: ComponentFixture<PracticalRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticalRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticalRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
