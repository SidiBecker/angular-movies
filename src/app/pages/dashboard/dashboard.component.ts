import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/shared/services/movie.service';
import {
  CardDashboardComponent,
  TableColumn,
} from './card-dashboard/card-dashboard.component';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CardDashboardComponent],
})
export class DashboardComponent implements OnInit {
  public yearsWithMultipleWinners: any[] = [];

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
  constructor(private movies: MovieService) {}

  ngOnInit(): void {
    this.movies.getYearsWithMultipleWinners().subscribe({
      next: (response: any) => {
        this.yearsWithMultipleWinners = response.years as any[];
      },
    });
  }
}
