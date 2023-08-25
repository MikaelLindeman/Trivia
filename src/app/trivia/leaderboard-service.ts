import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  private baseUrl = 'http://localhost:3000/gameResults';

  constructor(private http: HttpClient) {}

  //Post the result to the server
  addGameResult(data: {
    score: number;
    category: string;
    difficulty: string;
    gamertag: string;
  }): Observable<any> {
    return this.http.post('http://localhost:3000/gameResults', data);
  }

  //Gets the result from the server
  getLeaderboard() {
    return this.http.get(this.baseUrl);
  }
}
