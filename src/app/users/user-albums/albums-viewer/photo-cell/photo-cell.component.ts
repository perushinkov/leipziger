import { Component, Input, OnInit } from '@angular/core';
import { Photo } from '../../../../model/photo';

@Component({
  selector: 'app-photo-cell',
  templateUrl: './photo-cell.component.html',
  styleUrls: ['./photo-cell.component.css']
})
export class PhotoCellComponent implements OnInit {
  @Input()
  photo: Photo;
  @Input()
  size: number;
  constructor() { }

  ngOnInit() {
  }

}
