import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { MovieService } from 'src/app/shared/services/movie.service';
import { of } from 'rxjs';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let moviesServiceMock: jasmine.SpyObj<MovieService>;

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
});
