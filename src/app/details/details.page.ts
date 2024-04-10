import {
  Component,
  Input,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCardSubtitle,
  IonContent,
  IonInfiniteScrollContent,
  IonList,
  IonItem,
  IonAvatar,
  IonSkeletonText,
  IonAlert,
  IonLabel,
  IonBadge,
  IonInfiniteScroll,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonText,
  IonCardContent,
  IonIcon,
} from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { MovieResult } from '../services/interfaces';
import { cashOutline, calendarOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonCardContent,
    IonText,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonCardSubtitle,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonCard,
    IonBadge,
    IonBadge,
    RouterModule,
    DatePipe,
    CurrencyPipe,
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
export class DetailsPage implements OnInit {
  private movieService = inject(MovieService);
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  public movie: WritableSignal<MovieResult | null> = signal(null);

  @Input()
  set id(movieId: string) {
    this.movieService.getMovieDetails(movieId).subscribe((movie) => {
      this.movie.set(movie);
    });
  }

  constructor() {
    addIcons({ cashOutline, calendarOutline });
  }

  ngOnInit() {}
}
