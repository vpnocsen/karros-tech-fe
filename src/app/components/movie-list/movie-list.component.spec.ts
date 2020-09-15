import { Component, Input } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { ApiService } from 'src/app/services/api.service';
import { Movie } from '../movie/movie.model';

import { MovieListComponent } from './movie-list.component';

@Component({
    selector: 'app-movie',
    template: `<div style="height:100vh">Hello: {{movie.id}}</div>`,
})
export class MovieComponent {
    @Input() movie: Movie;
}

describe('MovieListComponent', () => {
    let component: MovieListComponent;
    let fixture: ComponentFixture<MovieListComponent>;
    let api: any;
    let activatedRoute: ActivatedRoute;
    beforeEach(async(() => {
        activatedRoute = new ActivatedRoute();
        activatedRoute.data = of({
            require: {
                category: 15,
                genres: null
            }
        });
        api = {
            getList: () => of({
                currentPage: 1,
                totalPages: 5,
                data: []
            })
        };
        TestBed.configureTestingModule({
            declarations: [MovieListComponent, MovieComponent],
            providers: [
                { provide: ApiService, useValue: api },
                { provide: ActivatedRoute, useValue: activatedRoute }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MovieListComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should remove the loading at then end of page when no more data', fakeAsync(() => {
        api.getList = () => of({
            currentPage: 1,
            totalPages: 1,
            data: []
        })
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        debugger;
        const spinner = fixture.debugElement.query(By.css('.spinner'));
        expect(spinner).toBeNull();
    }));

    it('should render 2 movie', () => {
        api.getList = (query) => of({
            currentPage: query.page,
            totalPages: 2,
            data: [
                new Movie({
                    id: 1,
                    poster_path: 'poster-path-1',
                    genre_ids: [1, 2],
                    release_date: '2020-09-15'
                }),
                new Movie({
                    id: 2,
                    poster_path: 'poster-path-2',
                    genre_ids: [1, 2],
                    release_date: '2021-09-15'
                })
            ] as Movie[]
        })
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            const movies = fixture.debugElement.queryAll(By.css('app-movie'));
            expect(movies.length).toBe(2);
        })
    });
});
