import { HttpClient, HttpClientModule } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: ApiService;
  let backend;
  let storage;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule, NgxWebstorageModule.forRoot({
        prefix: 'test',
        separator: '.'
      })]
    });
    storage = TestBed.inject(StorageService);
    backend = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should corrted `getMovieGenres`', fakeAsync(() => {
    let resData;
    service.getMovieGenre().subscribe(res => {
      resData = res;
    });
    const request = backend.expectOne({ url: 'api/genre/movie/list?api_key=a7b3c9975791294647265c71224a88ad' });
    request.flush({
      genres: [1, 2, 3, 4]
    });
    tick();
    const value = storage.movieGenres;
    expect(value).toEqual([1, 2, 3, 4]);
  }));

  it('should be corrected `popular`', fakeAsync(() => {
    let resData;
    service.getList({ category: 'popular', page: 1, genres: null }).subscribe(res => {
      resData = res;
    });
    const request = backend.expectOne({ url: 'api/movie/popular?api_key=a7b3c9975791294647265c71224a88ad&page=1' });
    request.flush({
      total_pages: 3,
      results: []
    });
    tick();
    expect(resData.totalPages).toBe(3);
  }));

  it('should be corrected `discover`', fakeAsync(() => {
    let resData;
    service.getList({ category: 'popular', page: 1, genres: 11 }).subscribe(res => {
      resData = res;
    });
    const request = backend.expectOne({ url: 'api/discover/movie?api_key=a7b3c9975791294647265c71224a88ad&with_genres=11&page=1' });
    request.flush({
      total_pages: 5,
      results: []
    });
    tick();
    expect(resData.totalPages).toBe(5);
  }));
});
