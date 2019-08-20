import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../model/user';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, of } from 'rxjs';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  activeUserIndex = -1;
  loadingMsg = 'Loading users...';

  faSearch = faSearch;
  constructor(private api: ApiService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    const usersObservable = this.api.getUsers();
    const paramsObservable = this.route.firstChild
      ?  this.route.firstChild.params
      : of(null);

    combineLatest(usersObservable, paramsObservable)
      .subscribe(([users, params]) => {
        this.users = users;
        if (params) {
          this.activeUserIndex = params
            ? this.users.findIndex(user => '' + user.id === params.id)
            : -1;
        }
      });
  }

  selectUser(index: number) {
    this.activeUserIndex = index;
  }
}
