import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input()
  itemCount: number;
  @Input()
  countPerPage: number;

  @Output()
  pageTurned = new EventEmitter<number>();

  currentPage = 0;
  lastPage = 0;
  constructor() { }

  ngOnInit() {
    this.currentPage = 0;
    this.lastPage = Math.abs(this.itemCount / this.countPerPage) - 1;
  }

  turnToPage(pageNumber: number) {
    if (pageNumber > this.lastPage || pageNumber < 0) {
      return;
    }
    this.pageTurned.emit(pageNumber);
    this.currentPage = pageNumber;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.lastPage = Math.abs(this.itemCount / this.countPerPage) - 1;
    if (this.lastPage > this.currentPage) {
      this.currentPage = 0;
      this.pageTurned.emit(0);
    }
  }
}
