import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTheoryModalComponent } from './new-theory-modal.component';

describe('NewTheoryModalComponent', () => {
  let component: NewTheoryModalComponent;
  let fixture: ComponentFixture<NewTheoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTheoryModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTheoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
