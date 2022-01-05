import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPracticalRowModalComponent } from './edit-practical-row-modal.component';

describe('EditPracticalRowModalComponent', () => {
  let component: EditPracticalRowModalComponent;
  let fixture: ComponentFixture<EditPracticalRowModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPracticalRowModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPracticalRowModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
