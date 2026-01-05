import { Injectable, Renderer2, RendererFactory2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { StorageService } from './storage.service';

export interface Theme {
  code: string;
  name: string;
  icon: string;
  primeNgTheme: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public readonly availableThemes: Theme[] = [
    {
      code: 'light',
      name: 'Light',
      icon: 'pi-sun',
      primeNgTheme: 'lara-light-blue'
    },
    {
      code: 'dark',
      name: 'Dark',
      icon: 'pi-moon',
      primeNgTheme: 'lara-dark-blue'
    }
  ];

  private readonly defaultTheme = 'light';
  private renderer: Renderer2;
  private currentThemeCode: string = this.defaultTheme;

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
    private storageService: StorageService
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.initTheme();
  }

  private initTheme(): void {
    // Get saved theme or use default
    const savedTheme = this.storageService.getTheme();
    const themeCodes = this.availableThemes.map(t => t.code);
    const themeToUse = savedTheme && themeCodes.includes(savedTheme)
      ? savedTheme
      : this.defaultTheme;

    this.setTheme(themeToUse);
  }

  setTheme(themeCode: string): void {
    const theme = this.availableThemes.find(t => t.code === themeCode);
    if (!theme) {
      console.error(`Theme ${themeCode} not found`);
      return;
    }

    this.currentThemeCode = themeCode;

    // Update Tailwind dark mode class
    const htmlElement = this.document.documentElement;
    if (themeCode === 'dark') {
      this.renderer.addClass(htmlElement, 'dark');
    } else {
      this.renderer.removeClass(htmlElement, 'dark');
    }

    // Update PrimeNG theme
    this.switchPrimeNgTheme(theme.primeNgTheme);

    // Persist preference
    this.storageService.setTheme(themeCode);
  }

  private switchPrimeNgTheme(themeName: string): void {
    const themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;

    if (themeLink) {
      // Update existing link
      themeLink.href = `${themeName}/theme.css`;
    } else {
      // Create new link element if it doesn't exist
      const head = this.document.getElementsByTagName('head')[0];
      const newThemeLink = this.renderer.createElement('link');
      this.renderer.setAttribute(newThemeLink, 'id', 'app-theme');
      this.renderer.setAttribute(newThemeLink, 'rel', 'stylesheet');
      this.renderer.setAttribute(newThemeLink, 'type', 'text/css');
      this.renderer.setAttribute(newThemeLink, 'href', `${themeName}/theme.css`);
      this.renderer.appendChild(head, newThemeLink);
    }
  }

  getCurrentTheme(): string {
    return this.currentThemeCode;
  }

  getCurrentThemeInfo(): Theme | undefined {
    return this.availableThemes.find(t => t.code === this.getCurrentTheme());
  }

  toggleTheme(): void {
    const newTheme = this.currentThemeCode === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  isDarkMode(): boolean {
    return this.currentThemeCode === 'dark';
  }
}
