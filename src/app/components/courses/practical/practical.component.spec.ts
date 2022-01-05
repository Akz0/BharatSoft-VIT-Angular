import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticalComponent } from './practical.component';

describe('PracticalComponent', () => {
  let component: PracticalComponent;
  let fixture: ComponentFixture<PracticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
