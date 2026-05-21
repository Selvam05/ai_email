import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmailRequest {
  recipientName: string;
  purpose: string;
  tone: string;
  notes?: string;
}

export interface EmailResponse {
  success: boolean;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AiService {
  private apiUrl = 'http://localhost:5000/generate-email';

  constructor(private http: HttpClient) {}

  generateEmail(data: EmailRequest): Observable<EmailResponse> {
    return this.http.post<EmailResponse>(this.apiUrl, data);
  }
}
