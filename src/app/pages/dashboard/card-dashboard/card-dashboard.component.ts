import { Component, Input, OnInit } from '@angular/core';


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

@Component({
  selector: 'card-dashboard',
  imports: [],
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

  ngOnInit(): void {
    this.checkSingleTable();
  }

  checkSingleTable() {
    if (this.tables.length == 0 && this.columns.length > 1) {
      const table: Table = {
        columns: this.columns,
        data: this.data
      };

      this.tables.push(table);
    }
  }
}


