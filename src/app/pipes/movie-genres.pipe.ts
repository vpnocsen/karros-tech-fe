import { Pipe, PipeTransform } from '@angular/core';
import { MovieListItem } from '../components/movie-list/movie-list.model';

@Pipe({
  name: 'movieGenres'
})
export class MovieGenresPipe implements PipeTransform {

  transform(value: number[], list: MovieListItem[]): unknown {
    return (list || []).filter(i => value.indexOf(i.id) !== -1)
      .map(i => i.name)
      .join(', ');
  }

}
