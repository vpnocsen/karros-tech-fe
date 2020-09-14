import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { Movie } from '../movie/movie.model';

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, AfterViewInit, OnDestroy {

    movies: Movie[] = [];
    hasMore: boolean = true;
    private page = 1;
    private category: number;
    private totalPages: number;
    private isLoading: boolean;
    private genres: number;
    private sub: Subscription;
    private destroyEvent;
    constructor(
        private api: ApiService,
        private activatedRoute: ActivatedRoute
    ) { }


    ngOnInit(): void {
        this.sub = this.activatedRoute.data.subscribe(({ require }) => {
            this.category = require.category;
            this.genres = require.genres;
            this.page = 1;
            this.movies = [];
            setTimeout(() => {
                this.requestData({
                    category: this.category,
                    genres: this.genres,
                    page: this.page
                })
            });
        })
    }

    ngAfterViewInit(): void {
        this.destroyEvent = window.addEventListener('scroll', (evt) => {
            const element = evt.currentTarget as any;
            if (element.scrollY + element.innerHeight > document.body.offsetHeight - 100) {
                this.requestData({
                    category: this.category,
                    genres: this.genres,
                    page: this.page + 1
                })
            }
        })
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
        if (this.destroyEvent) {
            this.destroyEvent();
        }
    }

    private requestData(query) {
        if (this.isLoading || !this.hasMore) {
            return;
        }
        this.isLoading = true;
        this.api.getList(query).pipe(
            map(res => {
                this.page = res.currentPage;
                this.totalPages = res.totalPages;
                this.hasMore = this.page < this.totalPages;
                this.movies = this.movies.concat(res.data);
            }),
            catchError(err => of(null))
        ).subscribe(res => {
            this.isLoading = false;
        })
    }
}
