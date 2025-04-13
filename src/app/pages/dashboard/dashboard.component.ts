import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/shared/services/movie.service';
import {
  CardDashboardComponent,
  Table,
  TableColumn,
  TableRow,
} from './card-dashboard/card-dashboard.component';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CardDashboardComponent],
})
export class DashboardComponent implements OnInit {

  public yearsWithMultipleWinners: TableRow[] = [];
  public yearsWithMultipleWinnersColumns: TableColumn[] = [
    {
      title: 'Year',
      field: 'year',
    },
    {
      title: 'Win Count',
      field: 'winnerCount',
    },
  ];

  public studiosWithWinCount: TableRow[] = [];
  public studiosWithWinCountColumns: TableColumn[] = [
    {
      title: 'Name',
      field: 'name',
    },
    {
      title: 'Win Count',
      field: 'winCount',
    }
  ]

  public minMaxWinIntervalForProducersTables: Table[] = [];

  constructor (private movies: MovieService) { }

  ngOnInit(): void {
    this.getYearsWithMultipleWinners();
    this.getStudiosWithWinCount();
    this.getMaxMinWinIntervalForProducers();
  }

  getYearsWithMultipleWinners() {
    this.movies.getYearsWithMultipleWinners().subscribe({
      next: (response: any) => {
        this.yearsWithMultipleWinners = response.years as any[];
      },
    });
  }

  getStudiosWithWinCount() {
    this.movies.getStudiosWithWinCount().subscribe({
      next: (response: any) => {
        const studiosWithWinCount = response.studios as any[];

        this.studiosWithWinCount = studiosWithWinCount.sort((a: any, b: any) => b.winCount - a.winCount).slice(0, 3)
      },
    });
  }

  getMaxMinWinIntervalForProducers() {
    this.movies.getMaxMinWinIntervalForProducers().subscribe({
      next: (response: any) => {

        const columns: TableColumn[] = [{
          title: 'Producer',
          field: 'producer'
        },
        {
          title: 'Interval',
          field: 'interval'
        },
        {
          title: 'Previous Year',
          field: 'previousWin'
        },
        {
          title: 'Following Year',
          field: 'followingWin'
        }]

        const maximumTable: Table = {
          title: 'Maximum',
          columns,
          data: response.max
        };

        const minimumTable: Table = {
          title: 'Minimum',
          columns,
          data: response.min
        }

        this.minMaxWinIntervalForProducersTables = [maximumTable, minimumTable]
      },
    });
  }
}
