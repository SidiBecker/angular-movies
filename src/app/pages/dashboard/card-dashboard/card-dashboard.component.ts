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
  data: TableRow[];
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

  // For single table
  @Input() columns: TableColumn[] = [];
  @Input() data: TableRow[] = [];

  // For multiple tables
  @Input() tables: Table[] = [];

  @Input() searchBar!: TableSearchbar;

  @Output() onSearch = new EventEmitter<string>();

  public lastSearch = '';

  ngOnInit(): void {
    this.checkSingleTable();
    debugger;
  }

  checkSingleTable() {
    if (this.tables.length == 0 && this.columns.length > 0) {
      const table: Table = {
        columns: this.columns,
        data: this.data,
      };

      this.tables.push(table);
    }
  }

  search(input: HTMLInputElement) {
    if (input.value == this.lastSearch) {
      return;
    }

    this.lastSearch = input.value;

    this.onSearch.emit(input.value);
  }
}
