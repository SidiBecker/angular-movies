import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { MovieService } from 'src/app/shared/services/movie.service';
import { of } from 'rxjs';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let moviesServiceMock: jasmine.SpyObj<MovieService>;

  const movieListMock = {
    content: [
      {
        id: 1,
        year: 1980,
        title: "Can't Stop the Music",
        studios: ['Associated Film Distribution'],
        producers: ['Allan Carr'],
        winner: true,
      },
      {
        id: 2,
        year: 1980,
        title: 'Cruising',
        studios: ['Lorimar Productions', 'United Artists'],
        producers: ['Jerry Weintraub'],
        winner: false,
      },
      {
        id: 12,
        year: 1981,
        title: 'Endless Love',
        studios: ['PolyGram', 'Universal Studios'],
        producers: ['Dyson Lovell'],
        winner: false,
      },
    ],
  };

  beforeEach(async () => {
    moviesServiceMock = jasmine.createSpyObj('MoviesService', ['getMovies']);

    await TestBed.configureTestingModule({
      imports: [ListComponent],
      providers: [{ provide: MovieService, useValue: moviesServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;

    // Initial mock service responses
    moviesServiceMock.getMovies.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get all movies', async () => {
    moviesServiceMock.getMovies.and.returnValue(of(movieListMock));

    // Call the function
    component.getMovies();

    // Wait for the async request
    await fixture.whenStable();

    fixture.detectChanges();

    expect(moviesServiceMock.getMovies).toHaveBeenCalled();

    expect(component.data).toEqual(movieListMock);

    // Rendering check
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('table tbody tr td')?.textContent).toContain(
      movieListMock.content[0].id,
    );
  });

  it('get all movies by year', async () => {
    const year = 1980;

    component.filters.year = 1980;

    const moviesByYear = {
      content: movieListMock.content.filter((movie) => movie.year == year),
    };

    moviesServiceMock.getMovies.and.returnValue(of(moviesByYear));

    // Call the function
    component.getMovies();

    // Wait for the async request
    await fixture.whenStable();

    fixture.detectChanges();

    expect(moviesServiceMock.getMovies).toHaveBeenCalled();

    expect(component.data).toEqual(moviesByYear);

    // Rendering check
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('table tbody tr')?.length).toEqual(
      moviesByYear.content.length,
    );
  });

  it('get all winner movies', async () => {
    component.filters.winner = true;

    const winnersMovies = {
      content: movieListMock.content.filter((movie) => movie.winner),
    };

    moviesServiceMock.getMovies.and.returnValue(of(winnersMovies));

    // Call the function
    component.getMovies();

    // Wait for the async request
    await fixture.whenStable();

    fixture.detectChanges();

    expect(moviesServiceMock.getMovies).toHaveBeenCalled();

    expect(component.data).toEqual(winnersMovies);

    // Rendering check
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('table tbody tr')?.length).toEqual(
      winnersMovies.content.length,
    );

    expect(compiled.querySelector('table tbody tr td')?.textContent).toContain(
      winnersMovies.content[0].id,
    );
  });

  it('get movies no results', async () => {
    component.filters.year = 1900;

    const moviesByYear = {
      content: movieListMock.content.filter(
        (movie) => movie.year == component.filters.year,
      ),
    };

    moviesServiceMock.getMovies.and.returnValue(of(moviesByYear));

    // Call the function
    component.getMovies();

    // Wait for the async request
    await fixture.whenStable();

    fixture.detectChanges();

    expect(moviesServiceMock.getMovies).toHaveBeenCalled();

    expect(component.data).toEqual(moviesByYear);

    // Rendering check
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('table tbody tr td')?.className).toContain(
      'empty',
    );
  });

  it('should call server when click navigation', () => {
    spyOn(component, 'getMovies');

    const buttons = fixture.nativeElement.querySelectorAll(
      '.pagination span',
    ) as HTMLSpanElement[];

    // Click all of navigation buttons and expect a server call
    for (const button of buttons) {
      button.click();
      fixture.detectChanges();

      expect(component.getMovies).toHaveBeenCalled();
    }
  });
});
