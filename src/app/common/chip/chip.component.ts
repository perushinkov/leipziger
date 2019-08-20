import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.css']
})
export class ChipComponent implements OnInit {
  @Input()
  message: string;

  @Output()
  removed = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  signalRemoved() {
    this.removed.emit();
  }

}

