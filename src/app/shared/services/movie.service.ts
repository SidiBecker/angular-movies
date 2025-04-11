import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private httpClient: HttpClient) {}

  getYearsWithMultipleWinners() {
    const params = {
      projection: 'years-with-multiple-winners',
    };

    return this.httpClient.get('/movies', { params });
  }
}
