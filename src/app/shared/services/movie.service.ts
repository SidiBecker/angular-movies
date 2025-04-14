import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private httpClient: HttpClient) {}

  public getMovies(params: any) {
    return this.httpClient.get('/movies', { params });
  }

  getYearsWithMultipleWinners() {
    return this.getMovies({ projection: 'years-with-multiple-winners' });
  }

  getStudiosWithWinCount() {
    return this.getMovies({ projection: 'studios-with-win-count' });
  }

  getMaxMinWinIntervalForProducers() {
    return this.getMovies({ projection: 'max-min-win-interval-for-producers' });
  }

  getWinnersByYear(year: number) {
    return this.getMovies({ winner: true, year });
  }
}
