import { Component, OnInit } from '@angular/core';
import { TriviaService } from '../trivia-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trivia-setup',
  templateUrl: './trivia-setup.component.html',
  styleUrls: ['./trivia-setup.component.scss'],
})
export class TriviaSetupComponent implements OnInit {
  categories: any;
  selectedCategory: string = 'any';
  selectedDifficulty: string = 'any';

  constructor(private triviaService: TriviaService, private router: Router) {}

  ngOnInit(): void {
    // Using the TriviaService to get the categories, subscribing to the Observable returned by the service
    this.triviaService.getCategories().subscribe((data: any) => {
      this.categories = data.trivia_categories;
    });
  }

  startGame(): void {
    // Requesting the questions from the TriviaService based on the selected category and difficulty.
    // Once the data is received, it is passed as a state while navigating to the trivia game component
    this.triviaService
      .getQuestions(this.selectedCategory, this.selectedDifficulty)
      .subscribe((data: any) => {
        this.router.navigate(['/trivia-game'], {
          state: { questions: data.results },
        });
      });
  }
}
