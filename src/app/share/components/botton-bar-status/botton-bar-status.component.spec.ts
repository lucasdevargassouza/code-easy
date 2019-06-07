import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottonBarStatusComponent } from './botton-bar-status.component';

describe('BottonBarStatusComponent', () => {
  let component: BottonBarStatusComponent;
  let fixture: ComponentFixture<BottonBarStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottonBarStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottonBarStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
