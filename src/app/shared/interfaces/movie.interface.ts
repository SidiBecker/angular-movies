export interface Movie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

export interface YearStats {
  year: number;
  winnerCount: number;
}

export interface Studio {
  name: string;
  winCount: number;
}

export interface ProducerInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface PageableSort {
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  sort: PageableSort;
  pageSize: number;
  pageNumber: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface MoviesResponse {
  content: Movie[];
  pageable: Pageable;
  totalElements: number;
  last: boolean;
  totalPages: number;
  first: boolean;
  sort: PageableSort;
  number: number;
  numberOfElements: number;
  size: number;
  years: YearStats[];
}

export interface StudiosResponse {
  studios: Studio[];
}

export interface ProducersIntervalResponse {
  min: ProducerInterval[];
  max: ProducerInterval[];
}
