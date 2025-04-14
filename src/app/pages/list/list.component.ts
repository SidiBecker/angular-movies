import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MovieService } from 'src/app/shared/services/movie.service';

export interface MovieListParams {
  page: number;
  size: number;
  winner?: boolean;
  year?: number;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [CommonModule],
})
export class ListComponent implements OnInit {
  public data: any;

  public filters: MovieListParams = {
    page: 0,
    size: 99,
  };

  public pages: any[] = [];

  // Timeout to wait for get movies after a resize event
  private resizeTimeout: any;

  @ViewChild('year', { static: false })
  yearEl!: ElementRef<HTMLInputElement>;

  constructor(private moviesService: MovieService) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // Clean existing timeout
    clearTimeout(this.resizeTimeout);

    // Set a timeout to recalculate the page size
    this.resizeTimeout = setTimeout(() => {
      this.calculatePageSize();
      this.calculatePageByOffset();
      this.getMovies();
    }, 300);
  }

  ngOnInit(): void {
    this.calculatePageSize();
    this.getMovies();
  }

  calculatePageSize() {
    const availableHeight = window.innerHeight;

    const itemHeight = 40;

    const headerHeight = 150;
    const footerHeight = 50;

    const usableHeight = availableHeight - headerHeight - footerHeight;

    this.filters.size = Math.floor(usableHeight / itemHeight);
  }

  calculatePageByOffset() {
    if (this.data.first || !this.data.pageable) {
      return;
    }

    // Get current offset value
    const offset = this.data.pageable.offset;

    if (this.filters.size > offset) {
      this.filters.page = 0; // If page size is grant than the current offset
    } else if (this.filters.size == offset) {
      this.filters.page = 1; // If page size is the same offset, switch to second page
    } else {
      // Calculates the page based on page size and current offset
      this.filters.page = Math.floor(offset / this.filters.size);
    }
  }

  getMovies() {
    if (this.yearEl) {
      const year = this.yearEl.nativeElement.value;

      if (year) {
        this.filters.year = Number(year);
      } else {
        this.filters.year = undefined;
      }
    }

    // Remove all null fields from object
    const params = Object.fromEntries(
      Object.entries(this.filters).filter(([_, value]) => value != null),
    );

    this.moviesService.getMovies(params).subscribe({
      next: (response: any) => {
        this.data = response;

        this.updatePages();
      },
    });
  }

  updatePages() {
    let pages = Array.from({ length: this.data.totalPages }, (_, i) => ({
      number: i + 1,
    }));

    if (this.filters.page <= 2) {
      pages = pages.slice(0, 5);
    } else if (this.filters.page >= this.data.totalPages - 2) {
      pages = pages.slice(this.data.totalPages - 5, this.data.totalPages);
    } else {
      const start = this.filters.page - 2;
      pages = pages.slice(start, start + 5);
    }

    pages.forEach((page: any, index) => {
      page.active = page.number == this.filters.page + 1;
    });

    this.pages = pages;
  }

  onChangeWinner(ev: any) {
    const value = ev.target.value;

    this.filters.page = 0;

    if (value != '') {
      this.filters.winner = JSON.parse(value);
    } else {
      this.filters.winner = undefined;
    }

    this.getMovies();
  }

  onChangeYear() {
    this.filters.page = 0;
    this.getMovies();
  }

  getCurrentYear() {
    return new Date().getFullYear();
  }
}
