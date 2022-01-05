import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintWindowComponent } from './print-window.component';

describe('PrintWindowComponent', () => {
  let component: PrintWindowComponent;
  let fixture: ComponentFixture<PrintWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
