import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  private baseUrl = 'http://localhost:3000/gameResults';

  constructor(private http: HttpClient) {}

  //Post the result to the server
  addGameResult(data: any) {
    return this.http.post(this.baseUrl, data);
  }

  //Gets the result from the server
  getLeaderboard() {
    return this.http.get(this.baseUrl);
  }
}
