import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../components/movie/movie.model';
import { map, tap } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { MovieListItem } from '../components/movie-list/movie-list.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) { }

  discoverMovie(genres: string, page) {
    const url = `api/discover/movie`;
    const params = {
      api_key: environment.apiKey,
      with_genres: genres,
      page
    };
    return this.http.get(url, { params });
  }

  getMovieGenre(): Observable<MovieListItem[]> {
    const url = `api/genre/movie/list`;
    const params = {
      api_key: environment.apiKey
    }
    return this.http.get<MovieListItem[]>(url, { params }).pipe(
      map((res: any) => {
        this.storage.movieGenres = res.genres;
        return res.genres;
      })
    );
  }

  getList({ category, page, genres }): Observable<{
    currentPage: number,
    totalPages: number,
    data: Movie[]
  }> {
    let obs: Observable<any>;
    if (genres) {
      obs = this.discoverMovie(genres, page);
    } else {
      const url = `api/movie/${category}`;
      const params = {
        api_key: environment.apiKey,
        page
      }
      obs = this.http.get(url, { params });
    }
    return obs.pipe(
      map((res: any) => {
        return {
          currentPage: page,
          totalPages: res && res.total_pages || 0,
          data: (res && res.results).map(m => new Movie(m))
        }
      })
    );
  }
}
