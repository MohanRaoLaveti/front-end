import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-profiles',
  imports: [],
  templateUrl: './profiles.html',
  styleUrl: './profiles.css'
})
export class Profiles {

  @Input() profile:any
  @Output() statusChange = new EventEmitter<{ id: number, status: string }>();

  approve() {
    this.statusChange.emit({ id: this.profile.id, status: 'APPROVED' });
  }

  reject() {
    this.statusChange.emit({ id: this.profile.id, status: 'REJECTED' });
  }}
