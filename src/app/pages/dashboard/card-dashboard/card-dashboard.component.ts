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

export interface Table {
  title?: string;
  columns: TableColumn[];
  data?: TableRow[];
  searchBar?: TableSearchbar;
}

export interface TableColumn {
  title: string;
  field: string;
}

export interface TableRow {
  [key: string]: string | number;
}

export interface TableSearchbar {
  type: 'text' | 'number';
  placeholder: string;
  min?: number;
  max?: number;
  search: (value: string) => void;
}

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
