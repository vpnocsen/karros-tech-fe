import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { MovieListItem } from '../movie-list/movie-list.model';
import { Movie } from './movie.model';

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
    @Input() movie: Movie;

    movieList: MovieListItem[] = [];

    constructor(private storage: StorageService) { }

    ngOnInit(): void {
        this.movieList = this.storage.movieGenres;
        this.storage.movieGenres$.subscribe((val: MovieListItem[]) => {
            this.movieList = val;
        })
    }

}
