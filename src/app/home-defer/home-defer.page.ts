import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  InfiniteScrollCustomEvent,
  IonInfiniteScrollContent,
  IonList,
  IonItem,
  IonAvatar,
  IonSkeletonText,
  IonAlert,
  IonLabel,
  IonBadge,
  IonInfiniteScroll,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import {
  Observable,
  Subject,
  Subscription,
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
} from 'rxjs';
import { ApiResult, MovieResult } from '../services/interfaces';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-defer',
  templateUrl: './home-defer.page.html',
  styleUrls: ['./home-defer.page.scss'],
  standalone: true,
  imports: [
    IonSearchbar,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonBadge,
    IonBadge,
    RouterModule,
    DatePipe,
    IonLabel,
    IonAlert,
    IonSkeletonText,
    IonAvatar,
    IonItem,
    IonList,
    IonHeader,
    IonLabel,
    IonToolbar,
    IonAvatar,
    IonSkeletonText,
    IonTitle,
    IonContent,
    IonList,
    IonAlert,
  ],
})
export class HomeDeferPage {
  private movieService = inject(MovieService);
  private currentPage = 1;
  public error = null;
  public isLoading = false;
  public movies: MovieResult[] = [];
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  public dummyArray = new Array(5);
  public searchTerm: string | null = null;
  private moviesObservable: Observable<ApiResult> =
    this.movieService.getTopRatedMovies();
  private searchTerms = new Subject<string>();
  private searchSubscription: Subscription;

  constructor() {
    this.searchSubscription = this.searchTerms
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((term) => {
        this.resetMovieList();
        this.searchTerm = term;
        this.updateMoviesObservale();
        this.loadMovies(this.moviesObservable);
      });
  }

  updateMoviesObservale() {
    if (this.searchTerm != null && this.searchTerm != '') {
      this.moviesObservable = this.movieService.getMoviesBySearchTerm(
        this.searchTerm,
        this.currentPage
      );
    } else {
      this.moviesObservable = this.movieService.getTopRatedMovies(
        this.currentPage
      );
    }
  }

  resetMovieList() {
    this.currentPage = 1;
    this.movies = [];
  }

  ngOnInit() {
    this.loadMovies(this.moviesObservable);
  }

  onSearchChange(event: any) {
    this.searchTerms.next(event.detail.value);
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  loadMovies(
    moviesObservable: Observable<ApiResult>,
    event?: InfiniteScrollCustomEvent
  ) {
    this.error = null;

    if (!event) {
      this.isLoading = true;
    }

    moviesObservable
      .pipe(
        finalize(() => {
          this.isLoading = false;
          if (event) {
            event.target.complete();
          }
        }),
        catchError((err: any) => {
          console.log(err);
          this.error = err.error.status_message;
          return [];
        })
      )
      .subscribe({
        next: (res) => {
          this.movies.push(...res.results);
          if (event) {
            event.target.disabled = res.total_pages === this.currentPage;
          }
        },
      });
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.updateMoviesObservale();
    this.loadMovies(this.moviesObservable, event);
  }
}
