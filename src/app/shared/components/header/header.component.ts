import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AvatarModule } from 'primeng/avatar';
import { AuthService } from '../../../core/services/auth.service';
import { LanguageService, Language } from '../../../core/services/language.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ButtonModule,
    MenuModule,
    OverlayPanelModule,
    AvatarModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  currentUser: User | null = null;
  languages: Language[] = [];
  currentLanguage: Language | undefined;

  userMenuItems: any[] = [];
  languageMenuItems: any[] = [];

  constructor(
    private authService: AuthService,
    private languageService: LanguageService
  ) {
    this.languages = this.languageService.availableLanguages;
    this.currentLanguage = this.languageService.getCurrentLanguageInfo();
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.initMenus();
  }

  private initMenus(): void {
    this.userMenuItems = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        command: () => this.viewProfile()
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        command: () => this.viewSettings()
      },
      {
        separator: true
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      }
    ];

    this.languageMenuItems = this.languages.map(lang => ({
      label: lang.nativeName,
      icon: lang.code === this.currentLanguage?.code ? 'pi pi-check' : '',
      command: () => this.changeLanguage(lang)
    }));
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  changeLanguage(language: Language): void {
    this.languageService.setLanguage(language.code);
    this.currentLanguage = language;
    this.initMenus(); // Refresh menus to update checkmark
  }

  viewProfile(): void {
    // Navigate to profile page (to be implemented)
    console.log('View profile');
  }

  viewSettings(): void {
    // Navigate to settings page (to be implemented)
    console.log('View settings');
  }

  logout(): void {
    this.authService.logout();
  }

  getUserInitials(): string {
    if (!this.currentUser) return 'U';
    const names = this.currentUser.fullName.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return this.currentUser.fullName.substring(0, 2).toUpperCase();
  }

  getRoleBadgeClass(): string {
    if (!this.currentUser) return 'bg-gray-100 text-gray-800';

    const roleClasses: { [key: string]: string } = {
      'admin': 'bg-amber-100 text-amber-800',
      'hr_manager': 'bg-blue-100 text-blue-800',
      'hr_staff': 'bg-green-100 text-green-800',
      'viewer': 'bg-gray-100 text-gray-800'
    };

    return roleClasses[this.currentUser.role] || 'bg-gray-100 text-gray-800';
  }
}
