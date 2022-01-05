import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPracticalRowModalComponent } from './new-practical-row-modal.component';

describe('NewPracticalRowModalComponent', () => {
  let component: NewPracticalRowModalComponent;
  let fixture: ComponentFixture<NewPracticalRowModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPracticalRowModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPracticalRowModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
