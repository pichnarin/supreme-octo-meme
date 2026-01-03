import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from './core/services/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'payroll-system';

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    // Language service is initialized in its constructor
    // This ensures translations are loaded on app start
  }
}
