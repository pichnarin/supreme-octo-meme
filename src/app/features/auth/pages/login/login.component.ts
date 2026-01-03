import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

// PrimeNG imports
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { AuthService } from '../../../../core/services/auth.service';
import { LanguageService, Language } from '../../../../core/services/language.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CheckboxModule,
    DropdownModule,
    MessageModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  errorMessage = '';
  returnUrl = '/dashboard';
  showDemoCredentials = false;

  languages: Language[] = [];
  selectedLanguage: Language | undefined;

  // Mock users for display
  mockUsers = [
    { username: 'admin', password: 'admin123', role: 'Admin' },
    { username: 'hrmanager', password: 'hrmanager123', role: 'HR Manager' },
    { username: 'hrstaff', password: 'hrstaff123', role: 'HR Staff' },
    { username: 'viewer', password: 'viewer123', role: 'Viewer' }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private languageService: LanguageService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private translate: TranslateService
  ) {
    this.languages = this.languageService.availableLanguages;
    this.selectedLanguage = this.languageService.getCurrentLanguageInfo();
  }

  ngOnInit(): void {
    this.initForm();

    // Get return URL from route parameters or default to '/dashboard'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const { username, password } = this.loginForm.value;

    this.authService.login({ username, password }).subscribe({
      next: (response) => {
        this.loading = false;
        this.router.navigate([this.returnUrl]);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.message || 'Login failed. Please try again.';
      }
    });
  }

  onLanguageChange(language: Language): void {
    this.languageService.setLanguage(language.code);
    this.selectedLanguage = language;
  }

  fillCredentials(username: string, password: string): void {
    this.loginForm.patchValue({ username, password });
    this.messageService.add({
      severity: 'info',
      summary: this.translate.instant('auth.login.credentialsFilled'),
      detail: this.translate.instant('auth.login.credentialsFilledDetail'),
      life: 2000
    });
  }

  onForgotPassword(): void {
    this.messageService.add({
      severity: 'info',
      summary: this.translate.instant('auth.login.forgotPasswordTitle'),
      detail: this.translate.instant('auth.login.forgotPasswordMessage'),
      life: 4000
    });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  get usernameInvalid(): boolean {
    const control = this.loginForm.get('username');
    return !!(control && control.invalid && control.touched);
  }

  get passwordInvalid(): boolean {
    const control = this.loginForm.get('password');
    return !!(control && control.invalid && control.touched);
  }
}
