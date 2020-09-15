import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { of } from 'rxjs/internal/observable/of';
import { MovieGenresPipe } from 'src/app/pipes/movie-genres.pipe';
import { StorageService } from 'src/app/services/storage.service';
import { MovieListItem } from '../movie-list/movie-list.model';

import { MovieComponent } from './movie.component';
import { Movie } from './movie.model';

describe('MovieComponent', () => {
    let component: MovieComponent;
    let fixture: ComponentFixture<MovieComponent>;
    let storageService: any;
    beforeEach(async(() => {
        const list = [
            { id: 1, name: 'action' },
            { id: 2, name: 'cartoon' }
        ] as MovieListItem[];

        storageService = {
            movieGenres: list,
            movieGenres$: of(list),
        };
        TestBed.configureTestingModule({
            imports: [LazyLoadImageModule],
            declarations: [
                MovieGenresPipe,
                MovieComponent
            ],
            providers: [
                { provide: StorageService, useValue: storageService }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MovieComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        component.movie = new Movie({
            poster_path: 'poster-path',
            genre_ids: [1, 2],
            release_date: '2020-09-15'
        });
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should render correct info', () => {
        component.movie = new Movie({
            title: 'test 001',
            poster_path: 'poster-path',
            genre_ids: [1, 2],
            release_date: '2020-09-15',
            vote_average: '5.5'
        });
        fixture.detectChanges();
        const element = fixture.debugElement;
        const year = element.query(By.css('.year')).nativeElement;
        expect(year.innerText).toBe('2020');

        const title = element.query(By.css('h5')).nativeElement;
        expect(title.innerText).toBe('test 001');

        const genres = element.query(By.css('.card-subtitle')).nativeElement;
        expect(genres.innerText).toBe('action, cartoon');

        const vote = element.query(By.css('.vote-average')).nativeElement;
        expect(vote.innerText).toBe('5.5');
    });
});
