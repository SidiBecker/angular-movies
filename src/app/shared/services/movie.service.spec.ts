import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MovieService } from './movie.service'; // Adjust the import path as needed

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService],
    });

    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch movies with multiple winners years', () => {
    const mockResponse = [
      { year: 2020, winners: ['Movie A', 'Movie B'] },
      { year: 2019, winners: ['Movie C'] },
    ];

    service.getYearsWithMultipleWinners().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      '/movies?projection=years-with-multiple-winners',
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
