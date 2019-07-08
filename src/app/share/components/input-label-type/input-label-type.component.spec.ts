import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputLabelTypeComponent } from './input-label-type.component';

describe('InputLabelTypeComponent', () => {
  let component: InputLabelTypeComponent;
  let fixture: ComponentFixture<InputLabelTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputLabelTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputLabelTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
