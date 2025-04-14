import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MovieService } from 'src/app/shared/services/movie.service';

export interface MovieListParams {
  page: number;
  size: number;
  winner?: boolean | null;
  year?: number;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [CommonModule],
})
export class ListComponent implements OnInit {
  public movies: any[] = [];

  private filter: MovieListParams = {
    page: 0,
    size: 99,
  };

  @ViewChild('year', { static: false })
  yearEl!: ElementRef<HTMLInputElement>;

  constructor(private moviesService: MovieService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    if (this.yearEl) {
      const year = this.yearEl.nativeElement.value;

      this.filter.year = Number(year);
    }

    // Remove all null fields of object
    const filters = Object.fromEntries(
      Object.entries(this.filter).filter(([_, value]) => value != null),
    );

    this.moviesService.getMovies(filters).subscribe({
      next: (response: any) => {
        this.movies = response.content;
      },
    });
  }

  onChangeWinner(ev: any) {
    const value = ev.target.value;

    if (value != '') {
      this.filter.winner = JSON.parse(value);
    } else {
      this.filter.winner = undefined;
    }

    this.getMovies();
  }

  getCurrentYear() {
    return new Date().getFullYear();
  }
}
