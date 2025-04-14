import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { of } from 'rxjs';
import { MovieService } from 'src/app/shared/services/movie.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let moviesServiceMock: jasmine.SpyObj<MovieService>;

  beforeEach(async () => {
    moviesServiceMock = jasmine.createSpyObj('MoviesService', [
      'getYearsWithMultipleWinners',
      'getStudiosWithWinCount',
      'getMaxMinWinIntervalForProducers',
    ]);
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [{ provide: MovieService, useValue: moviesServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    // Initial mock service responses
    moviesServiceMock.getYearsWithMultipleWinners.and.returnValue(of([]));
    moviesServiceMock.getStudiosWithWinCount.and.returnValue(of([]));
    moviesServiceMock.getMaxMinWinIntervalForProducers.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('get years with multiple winners', async () => {
    const responseMock = {
      years: [
        { year: 1986, winnerCount: 1 },
        { year: 1990, winnerCount: 2 },
        { year: 2015, winnerCount: 3 },
      ],
    };

    moviesServiceMock.getYearsWithMultipleWinners.and.returnValue(
      of(responseMock),
    );

    // Call the function
    component.getYearsWithMultipleWinners();

    // Wait for the async request
    await fixture.whenStable();

    fixture.detectChanges();

    expect(moviesServiceMock.getYearsWithMultipleWinners).toHaveBeenCalled();

    expect(component.yearsWithMultipleWinnersTable.data).toEqual(
      responseMock.years,
    );

    // Rendering check
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector(
        '#card-dashboard-multiple-winners table tbody tr td',
      )?.textContent,
    ).toContain(responseMock.years[0].year);
  });

  it('get studios with win count', async () => {
    const responseMock = {
      studios: [
        { name: 'Columbia Pictures', winCount: 7 },
        { name: 'Paramount Pictures', winCount: 6 },
        { name: 'Warner Bros.', winCount: 5 },
        { name: '20th Century Fox', winCount: 4 },
      ],
    };

    moviesServiceMock.getStudiosWithWinCount.and.returnValue(of(responseMock));

    // Call the function
    component.getStudiosWithWinCount();

    // Wait for the async request
    await fixture.whenStable();

    fixture.detectChanges();

    expect(moviesServiceMock.getStudiosWithWinCount).toHaveBeenCalled();

    expect(component.studiosWithWinCountTable.data).toEqual(
      component.getTopStudiosWithWin(responseMock.studios),
    );

    // Rendering check
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector(
        '#card-dashboard-top-studios-winners table tbody tr td',
      )?.textContent,
    ).toContain(responseMock.studios[0].name);
  });
});
