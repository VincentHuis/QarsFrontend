import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {VestigingDto} from '../dto/VestigingDto';

@Injectable({ providedIn: 'root' })
export class VestigingenService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  async getVestigingen(): Promise<VestigingDto[]> {
    return firstValueFrom(
      this.http.get<VestigingDto[]>(
        `${this.apiUrl}/api/vestigingen`,
        {
          //params: new HttpParams()
          //  .set('lat', '53.2194')
          //  .set('lon', '6.5665'),
          withCredentials: true
        }
      )
    );
  }

  async getVestiging(id: number): Promise<VestigingDto> {
    return firstValueFrom(
      this.http.get<VestigingDto>(`${this.apiUrl}/api/vestigingen/${id}`, {
        withCredentials: true
      })
    );
  }
}
