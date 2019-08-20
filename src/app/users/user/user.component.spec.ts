import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  Given(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent],
      imports: [],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA] // Thus fa-icon doesn't trigger error
    })
    .compileComponents();
  }));

  Given(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
  });

  When(() => {
    fixture.detectChanges();
  });

  describe('Should not render if input user is not set', () => {
    Then('should create even with undefined user', () => {
      expect(component).toBeTruthy();
      expect(fixture.nativeElement.innerText).toEqual('');
    });
  });

  describe('When user is set', () => {
    Given(() => {
      component.user = {
        id: 1,
        username: 'testuser',
        email: 'user@mail.com',
        name: 'John Doe'
      };
    });
    Then('Rendered html should contain user information', () => {
      expect(component).toBeTruthy();
      expect(fixture.nativeElement.innerText).toContain(component.user.name);
      expect(fixture.nativeElement.innerText).toContain(component.user.username);
      expect(fixture.nativeElement.innerText).toContain(component.user.email);
    });
  });
});
