import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { filter } from 'rxjs/operators';
import { MENU_ITEMS, MenuItem } from '../../constants/menu.constant';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    RippleModule,
    TooltipModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ height: '0', opacity: 0, overflow: 'hidden' }),
        animate('200ms ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1, overflow: 'hidden' }),
        animate('200ms ease-in', style({ height: '0', opacity: 0 }))
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit, OnChanges {
  @Input() collapsed = false;
  @Output() toggleCollapse = new EventEmitter<void>();

  menuItems: MenuItem[] = MENU_ITEMS;
  expandedItems: Set<string> = new Set();
  activeRoute = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Track current route
    this.activeRoute = this.router.url;
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.activeRoute = event.url;
        this.autoExpandActiveMenu();
      });

    this.autoExpandActiveMenu();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Keep submenu state persistent - don't clear on collapse
    // Only auto-expand active menu when sidebar expands (if not already expanded)
    if (changes['collapsed'] && changes['collapsed'].currentValue === false) {
      this.autoExpandActiveMenu();
    }
  }

  private autoExpandActiveMenu(): void {
    // Auto-expand parent menu if child route is active
    this.menuItems.forEach((item, index) => {
      if (item.items) {
        const hasActiveChild = item.items.some(child =>
          child.route && this.activeRoute.startsWith(child.route)
        );
        if (hasActiveChild) {
          this.expandedItems.add(item.label);
        }
      }
    });
  }

  toggleSubmenu(item: MenuItem): void {
    // Don't toggle submenu when sidebar is collapsed
    if (this.collapsed) {
      return;
    }

    if (this.expandedItems.has(item.label)) {
      this.expandedItems.delete(item.label);
    } else {
      this.expandedItems.add(item.label);
    }
  }

  isExpanded(item: MenuItem): boolean {
    return this.expandedItems.has(item.label);
  }

  isActive(route: string | undefined): boolean {
    if (!route) return false;
    return this.activeRoute === route || this.activeRoute.startsWith(route + '/');
  }

  hasActiveChild(item: MenuItem): boolean {
    if (!item.items) return false;
    return item.items.some(child => this.isActive(child.route));
  }

  navigate(item: MenuItem): void {
    if (item.route) {
      this.router.navigate([item.route]);
    } else if (item.items) {
      this.toggleSubmenu(item);
    }
  }

  onToggleCollapse(): void {
    this.toggleCollapse.emit();
  }
}
