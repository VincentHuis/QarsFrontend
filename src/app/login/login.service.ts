import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private apiUrl = 'http://localhost:8080/auth/login';

  constructor(private http: HttpClient) {}

  async login(username: string, password: string): Promise<string> {
    const body = { username, password };
    try {
      const response = await firstValueFrom(this.http.post<{ token: string }>(this.apiUrl, body));
      return response.token;
    } catch (e) {
      throw e;
    }
  }
}
