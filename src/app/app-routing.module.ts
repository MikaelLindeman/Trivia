import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TriviaSetupComponent } from './trivia/trivia-setup/trivia-setup.component';
import { TriviaGameComponent } from './trivia/trivia-game/trivia-game.component';
import { TriviaResultComponent } from './trivia/trivia-result/trivia-result.component';

const routes: Routes = [
  { path: '', redirectTo: '/setup', pathMatch: 'full' },
  { path: 'setup', component: TriviaSetupComponent },
  { path: 'trivia-game', component: TriviaGameComponent },
  { path: 'trivia-result', component: TriviaResultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
