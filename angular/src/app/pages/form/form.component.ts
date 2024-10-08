import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  record = { title: '', type: '', description: '', address: '' };
  isEdit: boolean = false;

  constructor(
    private apiService: ApiService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.loadRecord(id);
    }
  }

  loadRecord(id: string): void {
    this.apiService.getDataById(`projects`, id).subscribe((data: any) => {
      this.record = data;
    });
  }

  onSubmit(): void {
    if (this.isEdit) {
      const {title, type, description, address } = this.record;
      const updateData = {title, type, description, address }
      this.apiService.updateData(
        'projects',
        this.route.snapshot.paramMap.get('id') || '',
        updateData
      ).subscribe(() => {
        alert('Record updated successfully!');
        this.router.navigate(['/dashboard']);
      });
    }else{
      this.apiService.saveData(
        'projects/create',
        this.record
      ).subscribe(() => {
        alert('Record saved successfully!');
        this.router.navigate(['/dashboard']);
      });
    }
    
  }

  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }


}