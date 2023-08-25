import { Component, OnInit } from '@angular/core';
import { TriviaService } from './trivia/trivia-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'trivia-app';

  constructor(private triviaService: TriviaService) {}

  ngOnInit(): void {
    this.triviaService.initializeCategories();
  }
}
