import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FixtureComponent } from './components/betting/fixture/fixture.component';
import { TopFixturesComponent } from './components/betting/sports/top-fixtures/top-fixtures.component';
import { TicketsComponent } from './components/betslip/tickets/tickets.component';
import { MatchDetailGuard } from './core/guards/matchDetailGuard.guard';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: TopFixturesComponent },
      {
        path: 'fixture/:id',
        component: FixtureComponent,
        canActivate: [MatchDetailGuard],
      },
    ],
  },
  { path: 'tickets', component: TicketsComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
