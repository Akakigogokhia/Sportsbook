import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { AppComponent } from './app.component';
import { TopFixturesComponent } from './components/betting/sports/top-fixtures/top-fixtures.component';

const appRoutes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'sport', component: AppComponent },
  { path: 'popular', component: TopFixturesComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
