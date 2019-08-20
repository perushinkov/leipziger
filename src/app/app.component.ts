import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { User } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private api: ApiService) {}
  users: User[] = [];

  ngOnInit(): void {
    this.api.getUsers().subscribe(users => this.users = users);
  }
}
