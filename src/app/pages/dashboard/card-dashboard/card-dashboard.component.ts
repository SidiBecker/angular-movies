import { Component, Input } from '@angular/core';

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
export class CardDashboardComponent {
  @Input() title = '';
  @Input() columns: TableColumn[] = [];
  @Input() data: TableRow[] = [];
}
