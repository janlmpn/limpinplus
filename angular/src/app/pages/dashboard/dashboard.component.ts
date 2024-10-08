import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  records: any[] = [];
  filteredRecords: any[] = [];
  searchQuery: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadRecords();
  }

  loadRecords(): void {
    this.apiService.getData('projects').subscribe((data: any) => {
      this.records = data;
      this.filteredRecords = data;
    });
  }

  deleteRecord(id: string): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.apiService.deleteData('projects', id).subscribe((data:any) => {
        this.loadRecords();
      })
    }
  }

  navigateToForm(): void {
    this.router.navigate(['/form']);
  }

  editRecord(id: string): void {
    this.router.navigate(['/form', { id }]);
  }

  onSearch(): void {
    if (this.searchQuery) {
      this.apiService.searchRecords(`projects`,this.searchQuery).subscribe((data: any) => {
        this.filteredRecords = data; 
      });
    } else {
      this.filteredRecords = this.records; 
    }
  }

}