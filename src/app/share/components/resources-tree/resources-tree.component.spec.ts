import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesTreeComponent } from './resources-tree.component';

describe('ResourcesTreeComponent', () => {
  let component: ResourcesTreeComponent;
  let fixture: ComponentFixture<ResourcesTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcesTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
