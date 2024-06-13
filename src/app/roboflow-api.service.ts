// src/app/roboflow-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoboflowApiService {
  private apiUrl = 'https://detect.roboflow.com';

  constructor(private http: HttpClient) { }

  inferFromDataset(datasetSlug: string, versionNumber: string, apiKey: string, imageData: string): Observable<any> {
    const url = `${this.apiUrl}/${datasetSlug}/${versionNumber}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = `image=${encodeURIComponent(imageData)}&api_key=${apiKey}&format=json`;

    return this.http.post<any>(url, body, { headers });
  }
}
