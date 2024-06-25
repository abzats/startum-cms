import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  isUser = false;
  constructor(private fb: FirebaseService, private router: Router) {}

  async ngOnInit() {
    await this.fb.auth.authStateReady();
    this.fb.auth.onAuthStateChanged((val) => {
      if (!val) {
        this.isUser = false;
        this.router.navigateByUrl('/login');

        return;
      }

      this.isUser = true;
    });
  }

  signOut() {
    this.fb.signOut();
  }
}
