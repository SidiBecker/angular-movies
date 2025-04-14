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

  it('should populate yearsWithMultipleWinnersTable.data when getYearsWithMultipleWinners is called', async () => {
    const responseMock = {
      years: [
        { year: 1986, winnerCount: 2 },
        { year: 1990, winnerCount: 2 },
        { year: 2015, winnerCount: 2 },
      ],
    };

    moviesServiceMock.getYearsWithMultipleWinners.and.returnValue(
      of(responseMock),
    );

    // Call the function
    component.getYearsWithMultipleWinners();

    // Wait for the async request
    await fixture.whenStable();

    expect(moviesServiceMock.getYearsWithMultipleWinners).toHaveBeenCalled();

    expect(component.yearsWithMultipleWinnersTable.data).toEqual(
      responseMock.years,
    );
  });
});
