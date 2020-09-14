import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { ResolverService } from './services/resolver.service';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'popular'
  },
  {
    path: ':category',
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      require: ResolverService
    },
    component: MovieListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
