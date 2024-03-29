import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TriviaSetupComponent } from './trivia/trivia-setup/trivia-setup.component';
import { TriviaGameComponent } from './trivia/trivia-game/trivia-game.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { TriviaResultComponent } from './trivia/trivia-result/trivia-result.component';
import { TriviaLeaderboardComponent } from './trivia/trivia-leaderboard/trivia-leaderboard.component';

@NgModule({
  declarations: [
    AppComponent,
    TriviaGameComponent,
    TriviaSetupComponent,
    TriviaResultComponent,
    TriviaLeaderboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
