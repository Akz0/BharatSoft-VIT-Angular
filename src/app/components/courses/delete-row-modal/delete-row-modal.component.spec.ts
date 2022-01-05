import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRowModalComponent } from './delete-row-modal.component';

describe('DeleteRowModalComponent', () => {
  let component: DeleteRowModalComponent;
  let fixture: ComponentFixture<DeleteRowModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRowModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRowModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
