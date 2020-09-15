import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ApiService } from './services/api.service';

describe('AppComponent', () => {
    let api;
    beforeEach(async(() => {
        api = jasmine.createSpyObj('ApiService', ['getMovieGenre']);
        api.getMovieGenre.and.returnValues(of([{ id: 1, name: 'action' }]));
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                AppComponent,
                HeaderComponent,
                FooterComponent
            ],
            providers: [
                { provide: ApiService, useValue: api },
            ]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'karros-tech-fe'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('karros-tech-fe');
    });

    it(`should have value from 'getMovieGenre'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        app.ngOnInit();
        fixture.detectChanges;
        app.movieList$.toPromise().then(val => {
            expect(val.length).toEqual(1);
        })
    });
});
