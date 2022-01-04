import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPracticalModalComponent } from './new-practical-modal.component';

describe('NewPracticalModalComponent', () => {
  let component: NewPracticalModalComponent;
  let fixture: ComponentFixture<NewPracticalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPracticalModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPracticalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
