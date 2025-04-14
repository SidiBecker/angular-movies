import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Table } from './card-dashboard.interface';

@Component({
  selector: 'card-dashboard',
  imports: [CommonModule],
  templateUrl: './card-dashboard.component.html',
  styleUrl: './card-dashboard.component.scss',
})
export class CardDashboardComponent implements OnInit {
  // Card title
  @Input() title = '';

  @Input() table!: Table;

  @Input() tables: Table[] = [];

  public lastSearch = '';

  ngOnInit(): void {
    this.checkSingleTable();
  }

  checkSingleTable() {
    if (this.tables.length == 0 && this.table != null) {
      this.tables.push(this.table);
    }
  }

  search(table: Table, input: HTMLInputElement) {
    if (input.value == this.lastSearch) {
      return;
    }

    this.lastSearch = input.value;

    table.searchBar?.search(input.value);
  }
}
