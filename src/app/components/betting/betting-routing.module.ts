import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { FixtureComponent } from './fixture/fixture.component';

const bettingRoutes: Routes = [
  { path: 'fixture/:id', component: FixtureComponent },
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
