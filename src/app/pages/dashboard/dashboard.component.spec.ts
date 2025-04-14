import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { of } from 'rxjs';
import { MovieService } from 'src/app/shared/services/movie.service';
import {
  Movie,
  MoviesResponse,
  StudiosResponse
} from 'src/app/shared/interfaces/movie.interface';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let moviesServiceMock: jasmine.SpyObj<MovieService>;

  beforeEach(async () => {
    moviesServiceMock = jasmine.createSpyObj('MoviesService', [
      'getYearsWithMultipleWinners',
      'getStudiosWithWinCount',
      'getMaxMinWinIntervalForProducers',
      'getWinnersByYear'
    ]);
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [{ provide: MovieService, useValue: moviesServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    // Initial mock service responses
    moviesServiceMock.getYearsWithMultipleWinners.and.returnValue(
      of([] as any)
    );
    moviesServiceMock.getStudiosWithWinCount.and.returnValue(of([] as any));
    moviesServiceMock.getMaxMinWinIntervalForProducers.and.returnValue(
      of([] as any)
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get years with multiple winners', async () => {
    fixture.detectChanges();

    const responseMock = {
      years: [
        { year: 1986, winnerCount: 1 },
        { year: 1990, winnerCount: 2 },
        { year: 2015, winnerCount: 3 }
      ]
    };

    moviesServiceMock.getYearsWithMultipleWinners.and.returnValue(
      of(responseMock)
    );

    // Call the function
    component.getYearsWithMultipleWinners();

    // Wait for the async request
    await fixture.whenStable();

    fixture.detectChanges();

    expect(moviesServiceMock.getYearsWithMultipleWinners).toHaveBeenCalled();

    expect(component.yearsWithMultipleWinnersTable.data).toEqual(
      responseMock.years
    );

    // Rendering check
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector(
        '#card-dashboard-multiple-winners table tbody tr td'
      )?.textContent
    ).toContain(responseMock.years[0].year);
  });

  it('get studios with win count', async () => {
    const responseMock: StudiosResponse = {
      studios: [
        { name: 'Columbia Pictures', winCount: 7 },
        { name: 'Paramount Pictures', winCount: 6 },
        { name: 'Warner Bros.', winCount: 5 },
        { name: '20th Century Fox', winCount: 4 }
      ]
    };

    moviesServiceMock.getStudiosWithWinCount.and.returnValue(of(responseMock));

    // Call the function
    component.getStudiosWithWinCount();

    // Wait for the async request
    await fixture.whenStable();

    fixture.detectChanges();

    expect(moviesServiceMock.getStudiosWithWinCount).toHaveBeenCalled();

    expect(component.studiosWithWinCountTable.data).toEqual(
      component.getTopStudiosWithWin(responseMock.studios) as any
    );

    // Rendering check
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector(
        '#card-dashboard-top-studios-winners table tbody tr td'
      )?.textContent
    ).toContain(responseMock.studios[0].name);
  });

  it('get produces with longest and shortest interval between wins', async () => {
    const responseMock = {
      min: [
        {
          producer: 'Joel Silver',
          interval: 1,
          previousWin: 1990,
          followingWin: 1991
        }
      ],
      max: [
        {
          producer: 'Matthew Vaughn',
          interval: 13,
          previousWin: 2002,
          followingWin: 2015
        }
      ]
    };

    moviesServiceMock.getMaxMinWinIntervalForProducers.and.returnValue(
      of(responseMock)
    );

    // Call the function
    component.getMaxMinWinIntervalForProducers();

    // Wait for the async request
    await fixture.whenStable();

    fixture.detectChanges();

    expect(
      moviesServiceMock.getMaxMinWinIntervalForProducers
    ).toHaveBeenCalled();

    expect(component.minMaxWinIntervalForProducersTables[0].data).toEqual(
      responseMock.max
    );

    expect(component.minMaxWinIntervalForProducersTables[1].data).toEqual(
      responseMock.min
    );

    // Rendering check
    const compiled = fixture.nativeElement as HTMLElement;

    const cardId = '#card-dashboard-producers-max-min-interval';

    // Rendering max
    expect(
      compiled.querySelector(`${cardId} #card-dashboard-table-0 tbody tr td`)
        ?.textContent
    ).toContain(responseMock.max[0].producer);

    // Rendering min
    expect(
      compiled.querySelector(`${cardId} #card-dashboard-table-1 tbody tr td`)
        ?.textContent
    ).toContain(responseMock.min[0].producer);
  });

  it('get winners by year', async () => {
    const year = 2002;

    const responseMock = [
      {
        id: 116,
        year,
        title: 'Swept Away',
        studios: ['Screen Gems'],
        producers: ['Matthew Vaughn'],
        winner: true
      }
    ];
    moviesServiceMock.getWinnersByYear.and.returnValue(of(responseMock));

    // Call the function
    component.getWinnersByYear(year.toString());

    // Wait for the async request
    await fixture.whenStable();

    fixture.detectChanges();

    expect(moviesServiceMock.getWinnersByYear).toHaveBeenCalled();

    expect(component.winnersByYearTable.data).toEqual(responseMock as any);

    // Rendering check
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('#card-dashboard-winners-year table tbody tr td')
        ?.textContent
    ).toContain(responseMock[0].id);
  });
});
