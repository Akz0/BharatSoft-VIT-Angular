import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPracticalModalComponent } from './edit-practical-modal.component';

describe('EditPracticalModalComponent', () => {
  let component: EditPracticalModalComponent;
  let fixture: ComponentFixture<EditPracticalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPracticalModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPracticalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
