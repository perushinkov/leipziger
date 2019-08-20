import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoCellComponent } from './photo-cell.component';

describe('PhotoCellComponent', () => {
  let component: PhotoCellComponent;
  let fixture: ComponentFixture<PhotoCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
