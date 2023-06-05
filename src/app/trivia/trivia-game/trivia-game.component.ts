import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TriviaService } from '../trivia-service';

@Component({
  selector: 'app-trivia-game',
  templateUrl: './trivia-game.component.html',
  styleUrls: ['./trivia-game.component.scss'],
})
export class TriviaGameComponent implements OnInit {
  // Initializes variables for questions, scores, time etc.
  questions: any[] = [];
  currentQuestion: any;
  currentQuestionIndex = 0;
  score = 0;
  timeLeft: number = 31;
  interval: any;
  shuffledAnswers: string[] = [];
  blinking = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private triviaService: TriviaService
  ) {}

  ngOnInit(): void {
    // Getting the questions passed in the navigation state
    this.questions = history.state.questions;

    // If there are no questions or the questions array is empty, navigate back to the setup page
    if (!this.questions || this.questions.length === 0) {
      this.router.navigate(['/']);
      return;
    }
    // Set the current question to the first one, then shuffles answers and then starts the timer
    this.currentQuestion = this.questions[this.currentQuestionIndex];
    this.shuffledAnswers = this.getShuffledAnswers();
    this.startTimer();
  }

  // This function starts a timer that counts down from 31 to 0 every second.
  // The text starts blinking red when less than 5 seconds left.
  startTimer(): void {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.blinking = this.timeLeft <= 5;
      } else {
        // If time's up, reset the timer and move to the next question
        this.blinking = false;
        this.timeLeft = 31;
        this.nextQuestion();
      }
    }, 1000);
  }

  checkAnswer(answer: string): void {
    //Check if answer is correct, if so increase score by 1
    if (answer === this.currentQuestion.correct_answer) {
      this.score++;
    }
    //Regardless of correct or incorrect, moves on the next Question
    this.nextQuestion();
  }

  nextQuestion(): void {
    // If there are more questions to display increase the amout of questions
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      // Update the current question to the next one on the list
      this.currentQuestion = this.questions[this.currentQuestionIndex];

      // Shuffle the next questions and reset the timer
      this.shuffledAnswers = this.getShuffledAnswers();
      this.timeLeft = 31;
    } else {
      // If there are no more questions, stop the timer, save the score and routes to the result page
      clearInterval(this.interval);
      this.triviaService.setScore(this.score);
      this.router.navigate(['/trivia-result']);
    }
  }

  // This function is responsible for getting and shuffling the answers of the current question
  getShuffledAnswers(): string[] {
    let answers = [
      ...this.currentQuestion.incorrect_answers,
      this.currentQuestion.correct_answer,
    ];
    return this.shuffleArray(answers);
  }

  // Shuffes the elements in an array
  shuffleArray(array: any[]): any[] {
    // Starting from the last element, pick a random element before the current one and swap them
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
