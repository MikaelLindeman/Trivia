import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

interface TriviaCategory {
  id: number;
  name: string;
}
interface CategoryResponse {
  trivia_categories: TriviaCategory[];
}

@Injectable({
  providedIn: 'root',
})
export class TriviaService {
  private sessionToken: string | null = null;
  private selectedCategory: string = '';
  private selectedDifficulty: string = '';

  private categoryMap: Map<string, string> = new Map();
  //Method to get the categories and store them in the local map
  initializeCategories(): void {
    this.getCategories().subscribe((response: CategoryResponse) => {
      for (let category of response.trivia_categories) {
        this.categoryMap.set(category.id.toString(), category.name);
      }
    });
  }

  //Convert category ID to name
  convertIdToCategoryName(categoryId: string): string {
    return this.categoryMap.get(categoryId) || 'Unknown';
  }

  constructor(private http: HttpClient) {
    this.retrieveSessionToken();
  }

  // Declaring a private BehaviorSubject with initial value 0 then converts BehaviorSubject to an obsrvable
  private scoreSubjectBehavior: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  public score$: Observable<number> = this.scoreSubjectBehavior.asObservable();

  // Method to update the score. It pushes the new score into the BehaviorSubject.
  setScore(score: number): void {
    this.scoreSubjectBehavior.next(score);
  }

  // Method to get the Observable of the score
  getScore(): Observable<number> {
    return this.score$;
  }

  // Retrieve the session token from the API
  retrieveSessionToken(): void {
    this.http
      .get('https://opentdb.com/api_token.php?command=request')
      .subscribe((response: any) => {
        this.sessionToken = response.token;
        console.log('New Session Token: ', this.sessionToken);
      });
  }

  // Resets session token if needed
  resetSessionToken(): void {
    if (this.sessionToken) {
      this.http
        .get(
          `https://opentdb.com/api_token.php?command=reset&token=${this.sessionToken}`
        )
        .subscribe((response: any) => {
          this.sessionToken = response.token;
          console.log('Reset Session Token: ', this.sessionToken);
        });
    } else {
      this.retrieveSessionToken();
    }
  }
  // Method to get the categories
  getCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(
      'https://opentdb.com/api_category.php'
    );
  }

  // Method to get the trivia questions based on the selected category and difficulty
  getQuestions(category: string, difficulty: string): Observable<any> {
    let url = 'https://opentdb.com/api.php?amount=7&type=multiple';

    // If category or difficulty is specific, i.e not 'any' then add the category parameter to th URL.
    if (category !== 'any') {
      url += `&category=${category}`;
      this.selectedCategory = category;
    }

    if (difficulty !== 'any') {
      url += `&difficulty=${difficulty}`;
      this.selectedDifficulty = difficulty;
    }

    // If a session token is available, add it to the URL.
    if (this.sessionToken) {
      url += `&token=${this.sessionToken}`;
    }

    // Send a GET request to the URL and return the resulting observable
    return this.http.get(url);
  }

  getCategory(): string {
    return this.selectedCategory;
  }
  getDifficulty(): string {
    return this.selectedDifficulty;
  }
}
