import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.userId;
    
    if (!userId) {
      return of(this.getEmptyStats());
    }

    return forkJoin({
      fitness: this.http.get(`${this.apiUrl}/fitness/stats/${userId}`),
      mood: this.http.get(`${this.apiUrl}/mood/stats/${userId}`),
      medication: this.http.get(`${this.apiUrl}/medication/stats/${userId}`)
    }).pipe(
      map((data: any) => ({
        steps: data.fitness?.totalSteps || 0,
        stepsTrend: 0,
        heartRate: '--',
        heartRateStatus: 'No data',
        mood: this.getMoodStatus(data.mood),
        moodStatus: data.mood?.totalEntries > 0 ? 'Tracked today' : 'Track your mood today',
        medicationsTaken: data.medication?.activeMedications || 0,
        medicationsTotal: data.medication?.totalMedications || 0,
        medicationsStatus: this.getMedicationStatus(data.medication)
      }))
    );
  }

  getWeeklyActivity(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.userId;
    
    if (!userId) {
      return of(this.getEmptyActivityData());
    }

    return this.http.get<any>(`${this.apiUrl}/fitness/user/${userId}`).pipe(
      map((activities: any) => {
        const weekData = [0, 0, 0, 0, 0, 0, 0];
        return {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            data: weekData,
            label: 'Steps',
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            tension: 0.4
          }]
        };
      })
    );
  }

  getMoodDistribution(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.userId;
    
    if (!userId) {
      return of(this.getEmptyMoodData());
    }

    return this.http.get<any>(`${this.apiUrl}/mood/stats/${userId}`).pipe(
      map((stats: any) => {
        const distribution = stats.moodDistribution || {};
        return {
          labels: ['Great', 'Good', 'Okay', 'Low'],
          datasets: [{
            data: [
              distribution['GREAT'] || 0,
              distribution['GOOD'] || 0,
              distribution['OKAY'] || 0,
              distribution['LOW'] || 0
            ],
            backgroundColor: ['#10b981', '#2563eb', '#f59e0b', '#ef4444']
          }]
        };
      })
    );
  }

  getAdminStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/stats`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/users`);
  }

  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData);
  }

  updateUser(userId: number, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/users/${userId}`, userData);
  }

  suspendUser(userId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/users/${userId}/suspend`, {});
  }

  activateUser(userId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/users/${userId}/activate`, {});
  }

  private getEmptyStats() {
    return {
      steps: 0,
      stepsTrend: 0,
      heartRate: '--',
      heartRateStatus: 'No data',
      mood: 'Not tracked',
      moodStatus: 'Track your mood today',
      medicationsTaken: 0,
      medicationsTotal: 0,
      medicationsStatus: 'No medications added'
    };
  }

  private getEmptyActivityData() {
    return {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        data: [0, 0, 0, 0, 0, 0, 0],
        label: 'Steps',
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.4
      }]
    };
  }

  private getEmptyMoodData() {
    return {
      labels: ['Great', 'Good', 'Okay', 'Low'],
      datasets: [{
        data: [0, 0, 0, 0],
        backgroundColor: ['#10b981', '#2563eb', '#f59e0b', '#ef4444']
      }]
    };
  }

  private getMoodStatus(moodData: any): string {
    if (!moodData || moodData.totalEntries === 0) return 'Not tracked';
    return 'Good';
  }

  private getMedicationStatus(medicationData: any): string {
    if (!medicationData || medicationData.totalMedications === 0) {
      return 'No medications added';
    }
    const pending = medicationData.totalMedications - medicationData.activeMedications;
    return pending > 0 ? `${pending} pending` : 'All up to date';
  }
}