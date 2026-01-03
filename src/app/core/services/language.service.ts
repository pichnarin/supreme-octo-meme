import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './storage.service';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  public readonly availableLanguages: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
    { code: 'km', name: 'Khmer', nativeName: 'ភាសាខ្មែរ', flag: '🇰🇭' },
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' }
  ];

  private readonly defaultLanguage = 'en';

  constructor(
    private translate: TranslateService,
    private storageService: StorageService
  ) {
    this.initLanguage();
  }

  private initLanguage(): void {
    // Set available languages
    const langCodes = this.availableLanguages.map(l => l.code);
    this.translate.addLangs(langCodes);

    // Set default language
    this.translate.setDefaultLang(this.defaultLanguage);

    // Get saved language or use default
    const savedLang = this.storageService.getLanguage();
    const langToUse = savedLang && langCodes.includes(savedLang) ? savedLang : this.defaultLanguage;

    this.setLanguage(langToUse);
  }

  setLanguage(langCode: string): void {
    this.translate.use(langCode);
    this.storageService.setLanguage(langCode);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || this.defaultLanguage;
  }

  getCurrentLanguageInfo(): Language | undefined {
    return this.availableLanguages.find(l => l.code === this.getCurrentLanguage());
  }
}
