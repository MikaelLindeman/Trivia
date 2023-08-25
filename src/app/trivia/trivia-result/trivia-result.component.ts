import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TriviaService } from '../trivia-service';
import { LeaderboardService } from '../leaderboard-service';

@Component({
  selector: 'app-trivia-result',
  templateUrl: './trivia-result.component.html',
  styleUrls: ['./trivia-result.component.scss'],
})
export class TriviaResultComponent implements OnInit {
  score: number = 0;

  constructor(
    private router: Router,
    private triviaService: TriviaService,
    private leaderboardService: LeaderboardService
  ) {}

  // Subscribe to the observable returned by the getScore() method then updates the score
  ngOnInit(): void {
    this.triviaService.getScore().subscribe((score) => {
      this.score = score;
      this.leaderboardService;
    });
  }

  // Restarting the game routes back to setup
  retry() {
    this.router.navigate(['/']);
  }
  gamertag: string = '';
  category = this.triviaService.getCategory();
  difficulty = this.triviaService.getDifficulty();

  submitScore() {
    // Check if gamertag has been provided and is of length 3
    if (this.gamertag.length !== 3) {
      alert('Please enter a valid 3-letter gamertag.');
      return;
    }

    // Prepare the data to be saved
    const data = {
      gamertag: this.gamertag,
      score: this.score,
      category: this.triviaService.convertIdToCategoryName(this.category),
      difficulty: this.difficulty,
    };

    // Use the leaderboardService to save the data
    this.leaderboardService.addGameResult(data).subscribe(
      (response) => {
        console.log('Score saved successfully!', response);
      },
      (error) => {
        console.error('Error saving score:', error);
      }
    );
  }
}
