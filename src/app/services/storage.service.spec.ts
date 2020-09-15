import { TestBed } from '@angular/core/testing';
import { LocalStorageService, NgxWebstorageModule } from 'ngx-webstorage';

import { MOVIE_GENRES, StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxWebstorageModule.forRoot({
        prefix: 'test',
        separator: '.'
      })]
    });
    TestBed.inject(LocalStorageService);
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have value', () => {
    localStorage.setItem(`test.${MOVIE_GENRES}`, JSON.stringify([1, 2, 3]));
    const val = service.movieGenres;
    expect(val).toEqual([1, 2, 3]);

    service.movieGenres = [10, 11, 12];
    const stored = localStorage.getItem(`test.${MOVIE_GENRES}`);
    expect(JSON.parse(stored)).toEqual([10, 11, 12]);
  });
});
