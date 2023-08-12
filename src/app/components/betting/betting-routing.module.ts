import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { FixtureComponent } from './fixture/fixture.component';
import { MatchDetailGuard } from 'src/app/core/guards/matchDetailGuard.guard';

const bettingRoutes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(bettingRoutes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class BettingRoutingModule {}
