import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data:any
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  goToChangesPage() {
    this.router.navigate(['/changeslist'])
  }
}
