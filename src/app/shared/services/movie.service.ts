import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  Movie,
  MoviesResponse,
  ProducersIntervalResponse,
  StudiosResponse,
  YearStats
} from '../interfaces/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private httpClient: HttpClient) {}

  public getMovies<T>(params: any): Observable<T> {
    return this.httpClient.get<T>('/movies', { params });
  }

  getYearsWithMultipleWinners(): Observable<{ years: YearStats[] }> {
    return this.getMovies<{ years: YearStats[] }>({
      projection: 'years-with-multiple-winners'
    });
  }

  getStudiosWithWinCount(): Observable<StudiosResponse> {
    return this.getMovies<StudiosResponse>({
      projection: 'studios-with-win-count'
    });
  }

  getMaxMinWinIntervalForProducers(): Observable<ProducersIntervalResponse> {
    return this.getMovies<ProducersIntervalResponse>({
      projection: 'max-min-win-interval-for-producers'
    });
  }

  getWinnersByYear(year: number): Observable<Movie[]> {
    return this.getMovies<Movie[]>({ winner: true, year });
  }
}
