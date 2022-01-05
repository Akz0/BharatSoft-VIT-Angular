import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheoryRowComponent } from './theory-row.component';

describe('TheoryRowComponent', () => {
  let component: TheoryRowComponent;
  let fixture: ComponentFixture<TheoryRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheoryRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheoryRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
