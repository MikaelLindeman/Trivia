import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from '../leaderboard-service';

@Component({
  selector: 'app-trivia-leaderboard',
  templateUrl: './trivia-leaderboard.component.html',
  styleUrls: ['./trivia-leaderboard.component.scss'],
})
export class TriviaLeaderboardComponent implements OnInit {
  leaderboardData: any[] = [];

  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit(): void {
    this.refreshLeaderboard();
  }

  // Fetch the leaderboard and update the local array
  refreshLeaderboard(): void {
    this.leaderboardService.getLeaderboard().subscribe((data: any[]) => {
      this.leaderboardData = data;
      this.sortLeaderboard();
    });
  }

  // Sort the leaderboard in descending order based on score
  sortLeaderboard(): void {
    this.leaderboardData.sort((a, b) => b.score - a.score);
  }

  addNewEntryToLeaderboard(entry: any): void {
    this.leaderboardData.push(entry);
    this.sortLeaderboard();
  }
}
