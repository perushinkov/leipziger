import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoUserSelectedComponent } from './no-user-selected.component';

describe('NoUserSelectedComponent', () => {
  let component: NoUserSelectedComponent;
  let fixture: ComponentFixture<NoUserSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoUserSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoUserSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
