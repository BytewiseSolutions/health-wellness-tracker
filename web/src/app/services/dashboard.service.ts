import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  getDashboardStats(): Observable<any> {
    // Simulate API call - replace with real API when backend is ready
    const stats = {
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
    
    return of(stats);
  }

  getWeeklyActivity(): Observable<any> {
    // Return empty data until user starts tracking
    const data = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        data: [0, 0, 0, 0, 0, 0, 0],
        label: 'Steps',
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.4
      }]
    };
    
    return of(data);
  }

  getMoodDistribution(): Observable<any> {
    // Return empty mood data
    const data = {
      labels: ['Great', 'Good', 'Okay', 'Low'],
      datasets: [{
        data: [0, 0, 0, 0],
        backgroundColor: ['#10b981', '#2563eb', '#f59e0b', '#ef4444']
      }]
    };
    
    return of(data);
  }
}