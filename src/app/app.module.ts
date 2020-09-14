import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieComponent } from './components/movie/movie.component';
import { HeaderComponent } from './components/header/header.component';
import { RatingComponent } from './components/rating/rating.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { MovieGenresPipe } from './pipes/movie-genres.pipe';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { FooterComponent } from './components/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RatingComponent,
    MovieListComponent,
    MovieComponent,
    MovieGenresPipe,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LazyLoadImageModule,
    NgxWebstorageModule.forRoot({
      prefix: 'karros',
      separator: '.'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
