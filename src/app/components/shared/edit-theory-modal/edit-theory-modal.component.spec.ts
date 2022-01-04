import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTheoryModalComponent } from './edit-theory-modal.component';

describe('EditTheoryModalComponent', () => {
  let component: EditTheoryModalComponent;
  let fixture: ComponentFixture<EditTheoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTheoryModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTheoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
