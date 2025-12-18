import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartData, ChartType, registerables } from 'chart.js';
import { DashboardService } from '../../services/dashboard.service';

Chart.register(...registerables);

@Component({
  selector: 'app-home',
  imports: [SidebarComponent, HeaderComponent, BaseChartDirective, RouterLink, DecimalPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  user: any = null;
  stats: any = {};
  public lineChartData: ChartData<'line'> = { labels: [], datasets: [] };
  public doughnutChartData: ChartData<'doughnut'> = { labels: [], datasets: [] };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: true, position: 'top' } },
    scales: { y: { beginAtZero: true } }
  };

  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } }
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
    
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.dashboardService.getDashboardStats().subscribe(stats => {
      this.stats = stats;
    });

    this.dashboardService.getWeeklyActivity().subscribe(data => {
      this.lineChartData = data;
    });

    this.dashboardService.getMoodDistribution().subscribe(data => {
      this.doughnutChartData = data;
    });
  }
}