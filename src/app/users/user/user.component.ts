import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input()
  user: User;
  @Input()
  active: boolean;

  faUser = faUser;

  constructor() {}

  ngOnInit() {
  }

}
