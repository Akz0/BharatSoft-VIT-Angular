import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRowModalComponent } from './edit-row-modal.component';

describe('EditRowModalComponent', () => {
  let component: EditRowModalComponent;
  let fixture: ComponentFixture<EditRowModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRowModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRowModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
