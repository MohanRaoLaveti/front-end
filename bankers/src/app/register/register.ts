import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  imports:[ReactiveFormsModule,CommonModule],
  styleUrls: ['./register.css'],
})
export class Register implements OnInit {
  registerForm!: FormGroup;
  branches: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      branchIfscCode: ['', Validators.required],
    });

    this.loadBranches();
  }

  loadBranches(): void {
    this.http.get<any[]>('http://localhost:8080/api/auth/branches').subscribe({
      next: (data) => (this.branches = data),
      error: (err) => console.error('Failed to load branches', err),
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.http
        .post('http://localhost:8080/api/auth/registerBanker', this.registerForm.value)
        .subscribe({
          next: (res) => alert('Banker registered successfully!'),
          error: (err) => alert('Registration failed'),
        });
    }
  }
}
