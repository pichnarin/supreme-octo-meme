import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  sidebarCollapsed = false;
  mobileSidebarOpen = false;

  toggleSidebar(): void {
    // On desktop, toggle collapsed state
    // On mobile, toggle open/close
    if (window.innerWidth >= 768) {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    } else {
      this.mobileSidebarOpen = !this.mobileSidebarOpen;
    }
  }

  closeMobileSidebar(): void {
    this.mobileSidebarOpen = false;
  }
}
