import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/shared/services/movie.service';
import { CardDashboardComponent } from './card-dashboard/card-dashboard.component';
import {
  Table,
  TableColumn,
  TableRow
} from './card-dashboard/card-dashboard.interface';
import {
  Studio,
  StudiosResponse
} from 'src/app/shared/interfaces/movie.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CardDashboardComponent]
})
export class DashboardComponent implements OnInit {
  public yearsWithMultipleWinnersTable: Table = {
    columns: [
      { title: 'Year', field: 'year' },
      { title: 'Win Count', field: 'winnerCount' }
    ]
  };

  public studiosWithWinCountTable: Table = {
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Win Count', field: 'winCount' }
    ]
  };

  public winnersByYearTable: Table = {
    columns: [
      { field: 'id', title: 'Id' },
      { field: 'year', title: 'Year' },
      { field: 'title', title: 'Title' }
    ],
    data: [],
    searchBar: {
      type: 'number',
      min: 1900,
      max: new Date().getFullYear(),
      placeholder: 'Search by year',
      search: (value: string) => {
        this.getWinnersByYear(value);
      }
    }
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
      next: (response) => {
        this.yearsWithMultipleWinnersTable.data = response.years as any;
      }
    });
  }

  getStudiosWithWinCount() {
    this.moviesService.getStudiosWithWinCount().subscribe({
      next: (response) => {
        const studiosWithWinCount = response.studios;

        if (studiosWithWinCount) {
          this.studiosWithWinCountTable.data = this.getTopStudiosWithWin(
            studiosWithWinCount
          ) as any;
        }
      }
    });
  }

  getTopStudiosWithWin(data: Studio[], limit = 3) {
    return data.sort((a, b) => b.winCount - a.winCount).slice(0, limit);
  }

  getMaxMinWinIntervalForProducers() {
    this.moviesService.getMaxMinWinIntervalForProducers().subscribe({
      next: (response) => {
        const columns: TableColumn[] = [
          { title: 'Producer', field: 'producer' },
          { title: 'Interval', field: 'interval' },
          { title: 'Previous Year', field: 'previousWin' },
          { title: 'Following Year', field: 'followingWin' }
        ];

        const maximumTable: Table = {
          title: 'Maximum',
          columns,
          data: response.max as any
        };

        const minimumTable: Table = {
          title: 'Minimum',
          columns,
          data: response.min as any
        };

        this.minMaxWinIntervalForProducersTables = [maximumTable, minimumTable];
      }
    });
  }

  getWinnersByYear(search: string) {
    this.moviesService.getWinnersByYear(Number(search)).subscribe({
      next: (response) => {
        this.winnersByYearTable.data = response as any;
      }
    });
  }
}
