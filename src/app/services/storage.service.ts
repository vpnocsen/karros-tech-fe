import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

export const MOVIE_GENRES = 'movie.genres';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private localStorage: LocalStorageService) { }

  get movieGenres$() {
    return this.localStorage.observe(MOVIE_GENRES);
  }

  get movieGenres() {
    return this.localStorage.retrieve(MOVIE_GENRES) || [];
  }

  set movieGenres(val) {
    this.localStorage.store(MOVIE_GENRES, val);
  }
}
