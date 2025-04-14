import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/shared/services/movie.service';
import {
  CardDashboardComponent,
  Table,
  TableColumn,
} from './card-dashboard/card-dashboard.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CardDashboardComponent],
})
export class DashboardComponent implements OnInit {
  public yearsWithMultipleWinnersTable: Table = {
    columns: [
      { title: 'Year', field: 'year' },
      { title: 'Win Count', field: 'winnerCount' },
    ],
  };

  public studiosWithWinCountTable: Table = {
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Win Count', field: 'winCount' },
    ],
  };

  public winnersByYearTable: Table = {
    columns: [
      { field: 'id', title: 'Id' },
      { field: 'year', title: 'Year' },
      { field: 'title', title: 'Title' },
    ],
    data: [],
    searchBar: {
      type: 'number',
      min: 1900,
      max: new Date().getFullYear(),
      placeholder: 'Search by year',
      search: (value: string) => {
        this.getWinnersByYear(value);
      },
    },
  };

  public minMaxWinIntervalForProducersTables: Table[] = [];

  constructor(private moviesService: MovieService) {}

  ngOnInit(): void {
    this.getYearsWithMultipleWinners();
    this.getStudiosWithWinCount();
    this.getMaxMinWinIntervalForProducers();
  }

  getYearsWithMultipleWinners() {
    this.moviesService.getYearsWithMultipleWinners().subscribe({
      next: (response: any) => {
        this.yearsWithMultipleWinnersTable.data = response.years as any[];
      },
    });
  }

  getStudiosWithWinCount() {
    this.moviesService.getStudiosWithWinCount().subscribe({
      next: (response: any) => {
        const studiosWithWinCount = response.studios as any[];

        if (studiosWithWinCount) {
          this.studiosWithWinCountTable.data = studiosWithWinCount
            .sort((a: any, b: any) => b.winCount - a.winCount)
            .slice(0, 3);
        }
      },
    });
  }

  getMaxMinWinIntervalForProducers() {
    this.moviesService.getMaxMinWinIntervalForProducers().subscribe({
      next: (response: any) => {
        const columns: TableColumn[] = [
          { title: 'Producer', field: 'producer' },
          { title: 'Interval', field: 'interval' },
          { title: 'Previous Year', field: 'previousWin' },
          { title: 'Following Year', field: 'followingWin' },
        ];

        const maximumTable: Table = {
          title: 'Maximum',
          columns,
          data: response.max,
        };

        const minimumTable: Table = {
          title: 'Minimum',
          columns,
          data: response.min,
        };

        this.minMaxWinIntervalForProducersTables = [maximumTable, minimumTable];
      },
    });
  }

  getWinnersByYear(search: string) {
    this.moviesService.getWinnersByYear(Number(search)).subscribe({
      next: (response: any) => {
        this.winnersByYearTable.data = response;
      },
    });
  }
}
