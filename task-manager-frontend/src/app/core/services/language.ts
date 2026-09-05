import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export type AppLang = 'fr' | 'es' | 'en';

const STORAGE_KEY = 'tm-lang';
const SUPPORTED_LANGS: AppLang[] = ['fr', 'es', 'en'];
const DEFAULT_LANG: AppLang = 'fr';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private translate = inject(TranslateService);
  private platformId = inject(PLATFORM_ID);

  readonly current = signal<AppLang>(DEFAULT_LANG);

  constructor() {
    this.current.set(this.resolveInitialLang());
  }

  init(): void {
    this.translate.setFallbackLang(DEFAULT_LANG);
    this.use(this.current());
  }

  use(lang: AppLang): void {
    this.translate.use(lang);
    this.current.set(lang);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.setAttribute('lang', lang);
    }
  }

  get supportedLangs(): AppLang[] {
    return SUPPORTED_LANGS;
  }

  private resolveInitialLang(): AppLang {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem(STORAGE_KEY) as AppLang | null;
      if (saved && SUPPORTED_LANGS.includes(saved)) return saved;

      const browserLang = navigator.language?.slice(0, 2) as AppLang;
      if (SUPPORTED_LANGS.includes(browserLang)) return browserLang;
    }
    return DEFAULT_LANG;
  }
}