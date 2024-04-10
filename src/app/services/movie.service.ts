import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private http = inject(HttpClient);
  constructor() { }

  getTopRatedMovies(page = 1){
    return this.http.get(`${BASE_URL}/movie/popular?page=${page}&api_key=${API_KEY}`)
  }

  getMovieDetails(id: string){
    return this.http.get(`${BASE_URL}/movie/${id}?&api_key=${API_KEY}`)
  }
}
