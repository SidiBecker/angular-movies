import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public yearsWithMultipleWinners: any[] = [];

  constructor(private movies: MovieService) {}

  ngOnInit(): void {
    this.movies.getYearsWithMultipleWinners().subscribe({
      next: (response: any) => {
        this.yearsWithMultipleWinners = response.years as any[];
      },
    });
  }
}
