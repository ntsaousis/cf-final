import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import { LoginRequest } from '../../shared/interfaces/app';

const API_URL = 'http://localhost:8080/api/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  /**
   * Authenticates the user and stores the JWT token in localStorage
   * @param data - The user login data (username and password)
   * @returns Observable with the backend response
   */
  login(data: LoginRequest): Observable<any> {
    return this.http.post<{ token: string }>(`${API_URL}/authenticate`, data).pipe(
      tap((response) => {
        // Store the token in localStorage
        localStorage.setItem('token', response.token);
      })
    );
  }

  /**
   * Checks if the user is logged in by verifying the presence of a JWT token in localStorage
   * @returns True if a token exists, false otherwise
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Retrieves the user's role from the JWT token
   * @returns The user's role (e.g., STUDENT, WARDEN) or null if not available
   */
  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token); // Decode the JWT
        console.log('Decoded Token:', decodedToken); // Log the decoded token for debugging
        return decodedToken.role; // Return the user's role
      } catch (error) {
        console.error('Error decoding token:', error);
        return null; // Return null if decoding fails
      }
    }
    return null; // Return null if no token exists
  }

  /**
   * Logs the user out by clearing the JWT token from localStorage
   */
  logout(): void {
    localStorage.removeItem('token');
  }
}
