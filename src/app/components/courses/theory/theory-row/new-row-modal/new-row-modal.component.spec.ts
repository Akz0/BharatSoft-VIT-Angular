import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRowModalComponent } from './new-row-modal.component';

describe('NewRowModalComponent', () => {
  let component: NewRowModalComponent;
  let fixture: ComponentFixture<NewRowModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRowModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRowModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
