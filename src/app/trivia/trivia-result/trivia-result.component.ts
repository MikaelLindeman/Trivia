import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TriviaService } from '../trivia-service';

@Component({
  selector: 'app-trivia-result',
  templateUrl: './trivia-result.component.html',
  styleUrls: ['./trivia-result.component.scss'],
})
export class TriviaResultComponent implements OnInit {
  score: number = 0;

  constructor(private router: Router, private triviaService: TriviaService) {}

  // Subscribe to the observable returned by the getScore() method then updates the score
  ngOnInit(): void {
    this.triviaService.getScore().subscribe((score) => {
      this.score = score;
    });
  }

  // Restarting the game routes back to setup
  retry() {
    this.router.navigate(['/']);
  }
}
