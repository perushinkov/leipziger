import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { User } from '../model/user';
import { ApiService } from '../services/api.service';
import { createSpyFromClass } from 'jasmine-auto-spies';
import { ActivatedRoute, Router } from '@angular/router';
import SpyObj = jasmine.SpyObj;
import { of } from 'rxjs';

// Dummy
// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({selector: 'app-user', template: ''})
class UserComponent {
  @Input()
  user: User;
  @Input()
  active: boolean;
}

// TODO: Generally for easier testing of routedComponents, developing a separate
//  testing utility file will be useful (even mandatory in the long run),
//  so it can be later reused in all routed components.
// (Routing components that aren't routed to are easy to test, so not a concern.
//  It will be just for routed components.)
// For now though we can use a mock!
const MOCK_USER_ID = 17; // value doesn't matter
class ActivatedRouteMock {
  firstChild = {
    params: of({id: MOCK_USER_ID})
  };
}

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  Given(async(() => {
    const apiServiceMock = createSpyFromClass(ApiService);
    const routerMock = createSpyFromClass(Router);
    TestBed.configureTestingModule({
      declarations: [ UsersComponent, UserComponent ],
      providers: [
        {provide: ApiService, useValue: apiServiceMock},
        {provide: ActivatedRoute, useValue: ActivatedRouteMock}
      ],
      schemas: [NO_ERRORS_SCHEMA]
  })
    .compileComponents();
  }));

  Given(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
  });

  When(() => {
    fixture.detectChanges();
  });

  describe('INIT with no inputs', () => {
    Then('Should be truthy', () => {
      expect(component).toBeTruthy();
    });
    Then('Expect a users loading message', () => {
      expect(fixture.nativeElement.innerText).toContain(component.loadingMsg);
    });
  });

  describe('INIT from inputs', () => {
    Given(() => {
      const apiSpy: SpyObj<ApiService> = fixture.debugElement.injector.get(ApiService) as SpyObj<ApiService>;
      apiSpy.getUsers.and.returnValue(of([
        {id: 1, name: 'Alexander Graham', email: 'algra@email.com', username: 'alexa99'},
        {id: MOCK_USER_ID, name: 'Misha Grigorov', email: 'misha@russianMail.com', username: 'misha75'},
        {id: 3, name: 'Natalya James', email: 'nates@borabora.com', username: 'javeliny'}
      ]));
    });

    Then('Expect to see user data instead of loading message', () => {
      expect(fixture.nativeElement.innerText).not.toContain(component.loadingMsg);
      const childrenComponents = fixture.nativeElement.querySelectorAll('app-user');
      expect(childrenComponents.length).toEqual(component.users.length);
    });
  });
});
