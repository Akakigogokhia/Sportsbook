import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MatchDetailComponent } from './sports/match-detail/match-detail.component';

const bettingRoutes: Routes = [
  { path: 'fixture/:id', component: MatchDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(bettingRoutes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class BettingRoutingModule {}
