import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieListItem } from './components/movie-list/movie-list.model';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'karros-tech-fe';
  movieList$: Observable<MovieListItem[]>;
  constructor(private api: ApiService) {

  }

  ngOnInit(): void {
    this.movieList$ = this.api.getMovieGenre();
  }
}
