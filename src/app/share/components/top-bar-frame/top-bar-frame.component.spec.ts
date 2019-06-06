import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarFrameComponent } from './top-bar-frame.component';

describe('TopBarFrameComponent', () => {
  let component: TopBarFrameComponent;
  let fixture: ComponentFixture<TopBarFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopBarFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
