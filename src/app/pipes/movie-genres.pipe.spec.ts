import { MovieGenresPipe } from './movie-genres.pipe';

describe('MovieGenresPipe', () => {
  it('create an instance', () => {
    const pipe = new MovieGenresPipe();
    expect(pipe).toBeTruthy();
  });
});
